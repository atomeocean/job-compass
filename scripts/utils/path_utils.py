from pathlib import Path

def get_project_root(root_depth: int = 2) -> Path:
    """
    根据当前文件获取项目根目录的路径
    Args:
        root_depth: 项目根目录的深度（从scripts/utils/path_utils.py向上追溯到仓库根目录的层级数）

    Returns:
        Path: 项目根目录的路径对象
    """
    return Path(__file__).resolve().parents[root_depth]