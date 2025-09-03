import logging
from pathlib import Path

# 项目根目录的深度（从当前脚本目录向上追溯的层级数）
PROJECT_ROOT_DEPTH = 2
# 获取并缓存项目根目录
PROJECT_ROOT = Path(__file__).resolve().parents[PROJECT_ROOT_DEPTH]

def setup_logging():
    log_dir = PROJECT_ROOT / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    log_file = log_dir / "logbook.log"

    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        filename=str(log_file),   # 日志输出到文件
        filemode='w'              # 'w' 表示每次重写，'a' 追加模式
    )