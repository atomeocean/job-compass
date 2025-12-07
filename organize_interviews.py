import os
import shutil

base_dir = "docs/zhHans/interview-experience"

# Map: folder_name -> list of files to move (optional, can be empty if folder exists)
# Also used to generate index.md
companies = {
    "amazon": [],
    "apple": [],
    "bloomberg": [],
    "bytedance": ["bytedance-sde-ng-2.md", "bytedance-sde-ng-3.md"],
    "fortinet": [],
    "google": [],
    "meta": ["meta-sde-intern-oa.md"],
    "icbc": ["ICBC-model.md"],
    "smbc": ["SMBC-model-validate.md"],
    "bethesda-game-studios": ["bethesda-game-studios.md"],
    "databricks": ["databricks-swe-intern-vo.md"],
    "doordash": ["doordash-phone-call.md"],
    "nomura": ["nomura-risk-analyst.md"],
    "rednote": ["rednote-ny.md"],
    "snowflake": ["snowflake.md"],
    "tiktok": ["tiktok-sde-intern-1.md", "tiktok-sde-intern-2.md"],
    "whatnot": ["whatnot-sde-video-interview.md"],
}

# Special casing for Titles
titles = {
    "icbc": "ICBC",
    "smbc": "SMBC",
    "bytedance": "ByteDance",
    "doordash": "DoorDash",
    "databricks": "Databricks",
    "tiktok": "TikTok",
    "bloomberg": "Bloomberg",
    "fortinet": "Fortinet",
    "google": "Google",
    "meta": "Meta",
    "amazon": "Amazon",
    "apple": "Apple",
    "bethesda-game-studios": "Bethesda Game Studios",
    "nomura": "Nomura",
    "rednote": "Rednote",
    "snowflake": "Snowflake",
    "whatnot": "Whatnot"
}

index_template = """---
title: {title}
createdDate: 2025-12-07
lastUpdated: 2025-12-07
---
# {title}面试经验

公司介绍页面链接暂无
"""

for company, files in companies.items():
    company_dir = os.path.join(base_dir, company)
    
    # 1. Create Directory
    if not os.path.exists(company_dir):
        print(f"Creating directory: {company_dir}")
        os.makedirs(company_dir)
    
    # 2. Move Files
    for filename in files:
        src = os.path.join(base_dir, filename)
        dst = os.path.join(company_dir, filename)
        if os.path.exists(src):
            print(f"Moving {src} to {dst}")
            shutil.move(src, dst)
        elif os.path.exists(dst):
            print(f"File already in place: {dst}")
        else:
            print(f"Warning: Source file not found: {src}")

    # 3. Create index.md
    index_path = os.path.join(company_dir, "index.md")
    # Only create if it doesn't exist (or overwrite? Requirement implied create. I'll overwrite to match spec exactly)
    # User said "每个子目录中新建一个index.md" - implied creating/ensuring.
    title = titles.get(company, company.capitalize())
    content = index_template.format(title=title)
    
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created index.md for {company}")

print("Organization complete.")
