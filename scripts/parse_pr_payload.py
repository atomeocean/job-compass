"""
用于处理传递进来的pr数据，将其封装为需要记录的json对象
"""

import json
import argparse
from scripts.utils.json_utils import read_json_file
from scripts.utils.path_utils import get_project_root

# 获取项目根目录
PROJECT_ROOT = get_project_root()

# 设置pr_record模版路径
PR_RECORD_TEMPLATE_PATH = PROJECT_ROOT / "templates/pr_record.json"

def parse_pr_payload(payload):
    """
    解析payload参数，将其封装为需要记录的json信息
    :param payload: 完整的pr信息
    :return: 需要记录的内容
    """

    # 读取pr record的模版
    pr_data = read_json_file(PR_RECORD_TEMPLATE_PATH)
    # 封装数据
    pr_data["id"] = payload["number"]
    pr_data["title"] = payload["title"]
    pr_data["author"] = payload["assignee"]["login"]
    pr_data["createAt"] = payload["created_at"]
    pr_data["mergedAt"] = payload["merged_at"]
    pr_data["link"] = payload["html_url"]

    pr_data["reviewer"] = resolve_reviewer(payload)

    return pr_data


def resolve_reviewer(payload):
    """
    确定PR的审核员
    requested_reviewers 只列还没提交review的人，审核员一approve就会被GitHub移出，
    合并时通常已经是空的，所以优先看workflow补进来的reviews列表
    :param payload: 完整的pr信息（reviews 字段由 workflow 从 /pulls/{n}/reviews 补充）
    :return: 审核员的GitHub账号，找不到时为空字符串
    """
    opener = payload["user"]["login"]
    # 排除PR发起人自己的评论
    reviews = [
        review for review in payload.get("reviews", [])
        if review.get("user") and review["user"]["login"] != opener
    ]

    # 最后一个approve的人，其次是最后一个提交过review的人
    approved = [review for review in reviews if review["state"] == "APPROVED"]
    if approved:
        return approved[-1]["user"]["login"]
    if reviews:
        return reviews[-1]["user"]["login"]

    # 都没有时退回到仍待审核的人
    requested = payload.get("requested_reviewers", [])
    return requested[0]["login"] if requested else ""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pr", required=True, help="PR data as JSON string")
    args = parser.parse_args()

    # 把 JSON 字符串解析成字典
    pr_payload = json.loads(args.pr)

    pr_data = parse_pr_payload(pr_payload)

    # 将内容写入标准输出中
    print(json.dumps(pr_data, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()