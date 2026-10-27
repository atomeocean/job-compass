"""
Stop hook：Claude 回复结束时，把最后一条回复的正文发到 webhook。
webhook 未配置时不发送，见 webhook.py。
"""
import json
import sys

from webhook import folder_name, quote, send_webhook, timestamp


def get_last_assistant_text(transcript_path: str) -> str:
    with open(transcript_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for line in reversed(lines):
        line = line.strip()
        if not line:
            continue
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue

        if entry.get("type") != "assistant":
            continue

        message = entry.get("message", {})
        parts = [
            block.get("text", "")
            for block in message.get("content", [])
            if isinstance(block, dict) and block.get("type") == "text"
        ]
        text = "\n".join(p for p in parts if p).strip()
        if text:
            return text

    return ""


def build_payload(cwd: str, text: str) -> dict:
    content = (
        f"**Session finished** (`{folder_name(cwd)}`) · {timestamp()}\n"
        f"> {quote(text) or '(empty)'}"
    )
    return {"content": content}


def main():
    raw = sys.stdin.read()
    try:
        data = json.loads(raw) if raw else {}
    except json.JSONDecodeError:
        return

    transcript_path = data.get("transcript_path")
    if not transcript_path:
        return

    text = get_last_assistant_text(transcript_path)
    if not text:
        return

    try:
        send_webhook(build_payload(data.get("cwd", ""), text))
    except Exception:
        pass


if __name__ == "__main__":
    main()
