#!/usr/bin/env python3

"""
Build a rich Discord embed from a GitHub push event and POST it to the
DISCORD_WEBHOOK URL.

Expected env vars (all provided by GitHub Actions):
- DISCORD_WEBHOOK
- GITHUB_EVENT_PATH        path to the push event JSON payload
- GITHUB_REPOSITORY        e.g. atomeocean/job-compass
- GITHUB_REF_NAME          branch name
- GITHUB_ACTOR             user who triggered the push
- GITHUB_SERVER_URL        e.g. https://github.com
"""

import json
import os
import sys

import requests

GITHUB_MARK_PNG = (
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
)
USER_AGENT = (
    "atomeocean-job-compass-discord-notifier/1.0 "
    "(+https://github.com/atomeocean/job-compass)"
)
COLOR_GREEN = 0x2ECC71
COLOR_ORANGE = 0xE67E22
FILE_LIST_LIMIT = 10
FIELD_VALUE_CHAR_LIMIT = 1024
DESCRIPTION_CHAR_LIMIT = 2000


def aggregate_changed_files(commits):
    """Dedupe files across commits, keeping the latest status (A/M/D)."""
    status_by_path = {}
    for commit in commits:
        for path in commit.get("added", []):
            status_by_path[path] = "A"
        for path in commit.get("modified", []):
            status_by_path[path] = "M"
        for path in commit.get("removed", []):
            status_by_path[path] = "D"
    return status_by_path


def format_file_list(status_by_path):
    """Return (field_value, total_count) for the Changed files field."""
    total = len(status_by_path)
    if total == 0:
        return "_no file changes_", 0

    items = sorted(status_by_path.items())
    shown = items[:FILE_LIST_LIMIT]
    remaining = total - len(shown)

    lines = [f"{status} {path}" for path, status in shown]
    body = "```\n" + "\n".join(lines) + "\n```"
    if remaining > 0:
        body += f"\nand {remaining} more"

    if len(body) > FIELD_VALUE_CHAR_LIMIT:
        body = body[: FIELD_VALUE_CHAR_LIMIT - 6] + "...```"
    return body, total


def build_payload(event, repo, ref_name, actor, server_url):
    commits = event.get("commits") or []
    head_commit = event.get("head_commit") or {}
    compare_url = event.get("compare") or f"{server_url}/{repo}"

    status_by_path = aggregate_changed_files(commits)
    has_deletions = "D" in status_by_path.values()
    color = COLOR_ORANGE if has_deletions else COLOR_GREEN

    file_list_value, total_files = format_file_list(status_by_path)

    author_name = (head_commit.get("author") or {}).get("name") or actor
    commit_msg = head_commit.get("message") or "(no commit message)"
    if len(commit_msg) > DESCRIPTION_CHAR_LIMIT:
        commit_msg = commit_msg[: DESCRIPTION_CHAR_LIMIT - 3] + "..."

    head_sha = head_commit.get("id") or event.get("after") or ""
    short_sha = head_sha[:7] if head_sha else "?"
    head_url = head_commit.get("url") or f"{server_url}/{repo}/commit/{head_sha}"

    commit_count = len(commits)
    commit_word = "commit" if commit_count == 1 else "commits"

    embed = {
        "title": f"Markdown update: {commit_count} {commit_word} pushed to {repo}",
        "url": compare_url,
        "color": color,
        "author": {
            "name": author_name,
            "url": f"{server_url}/{actor}",
            "icon_url": f"{server_url}/{actor}.png",
        },
        "description": commit_msg,
        "fields": [
            {"name": "Branch", "value": ref_name, "inline": True},
            {"name": "Commits", "value": str(commit_count), "inline": True},
            {
                "name": "Latest SHA",
                "value": f"[`{short_sha}`]({head_url})",
                "inline": True,
            },
            {
                "name": f"Changed files ({total_files})",
                "value": file_list_value,
                "inline": False,
            },
        ],
        "footer": {"text": repo},
    }
    if head_commit.get("timestamp"):
        embed["timestamp"] = head_commit["timestamp"]

    return {
        "username": "Job Compass GitHub Bot",
        "avatar_url": GITHUB_MARK_PNG,
        "embeds": [embed],
    }


def post_to_discord(webhook_url, payload):
    headers = {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
    }
    response = requests.post(webhook_url, json=payload, headers=headers, timeout=15)
    response.raise_for_status()
    return response.status_code


def main():
    webhook = os.environ.get("DISCORD_WEBHOOK")
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    ref_name = os.environ.get("GITHUB_REF_NAME", "")
    actor = os.environ.get("GITHUB_ACTOR", "")
    server_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com")

    if not webhook:
        print("DISCORD_WEBHOOK is not set", file=sys.stderr)
        return 1
    if not event_path or not os.path.exists(event_path):
        print(f"GITHUB_EVENT_PATH missing or unreadable: {event_path}", file=sys.stderr)
        return 1

    with open(event_path, "r", encoding="utf-8") as f:
        event = json.load(f)

    payload = build_payload(event, repo, ref_name, actor, server_url)

    try:
        status = post_to_discord(webhook, payload)
    except requests.HTTPError as e:
        code = e.response.status_code if e.response is not None else "?"
        body = e.response.text if e.response is not None else ""
        print(f"Discord webhook returned HTTP {code}: {body}", file=sys.stderr)
        return 1
    except requests.RequestException as e:
        print(f"Discord webhook request failed: {e}", file=sys.stderr)
        return 1

    print(f"Discord webhook accepted (HTTP {status})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
