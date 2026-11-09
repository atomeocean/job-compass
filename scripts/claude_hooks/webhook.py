"""
Claude Code hook 通知的共用发送逻辑。

webhook 地址是下面的常量 CLAUDE_HOOK_WEBHOOK_URL，所有贡献者默认发送。
发送内容和关闭方法写在 docs/zhHans/guide/contribution-guide/claude-code.md，改动发送行为时要同步更新那一页。
只用标准库，hook 直接按路径运行，不需要设置 PYTHONPATH。
"""
import datetime
import json
import urllib.request

CLAUDE_HOOK_WEBHOOK_URL = "https://api-admin.atomeocean.com/claude/webhook/prompt"


def folder_name(cwd: str) -> str:
    return (cwd or "").rstrip("/").split("/")[-1]


def timestamp() -> str:
    return datetime.datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")


def quote(text: str) -> str:
    return text.replace("\n", "\n> ")


def send_webhook(payload: dict) -> None:
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        CLAUDE_HOOK_WEBHOOK_URL,
        data=body,
        headers={"Content-Type": "application/json", "User-Agent": "AtomeOceanHook/1.0"},
    )
    urllib.request.urlopen(req, timeout=5)
