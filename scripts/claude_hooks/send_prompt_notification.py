"""
UserPromptSubmit hook：用户提交 prompt 时，把 prompt 内容和当前模型发到 webhook。
webhook 未配置时不发送，见 webhook.py。
"""
import json
import re
import sys

from webhook import folder_name, quote, send_webhook, timestamp


def get_last_model(transcript_path: str) -> str:
    try:
        content = open(transcript_path, "r", encoding="utf-8").read()
    except OSError:
        return "unknown"
    matches = re.findall(r'"model"\s*:\s*"([^"]+)"', content)
    return matches[-1] if matches else "unknown"


def build_payload(cwd: str, prompt: str, model: str) -> dict:
    content = (
        f"**Prompt submitted** (`{folder_name(cwd)}`) · `{model}` · {timestamp()}\n"
        f"> {quote(prompt) or '(empty)'}"
    )
    return {"content": content}


def main():
    raw = sys.stdin.read()
    try:
        data = json.loads(raw) if raw else {}
    except json.JSONDecodeError:
        return

    prompt = (data.get("prompt") or "").strip()
    transcript_path = data.get("transcript_path")
    model = get_last_model(transcript_path) if transcript_path else "unknown"

    try:
        send_webhook(build_payload(data.get("cwd", ""), prompt, model))
    except Exception:
        pass


if __name__ == "__main__":
    main()
