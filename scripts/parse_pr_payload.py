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

    # 审核员信息可能不存在，需要单独处理
    reviewers = payload.get("requested_reviewers", [])
    pr_data["reviewer"] = reviewers[0]["login"] if reviewers else ""

    return pr_data


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