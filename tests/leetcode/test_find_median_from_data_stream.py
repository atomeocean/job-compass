"""Guard the 295. Find Median from Data Stream solution shown on its page: compare each running
median with a sorted copy, check the page's example, duplicates, negatives and the empty case."""

from random import Random
from statistics import median

import pytest


@pytest.fixture
def finder(load_solution):
    return load_solution("p0295_find_median_from_data_stream.py").MedianFinder()


def test_page_example(finder):
    medians = []
    for value in [5, 15, 1, 3]:
        finder.addNum(value)
        medians.append(finder.findMedian())
    assert medians == [5.0, 10.0, 5.0, 4.0]


@pytest.mark.parametrize("values", [
    [4],
    [-2, -9],
    [7, 7, 7, 7, 7],
    [10, 9, 8, 7, 6, 5],
    [1, 2, 3, 4, 5, 6],
    [0, -1, 1, -2, 2],
    [3, 3, 1, 1, 2, 2],
])
def test_running_median_matches_sorted_copy(finder, values):
    seen = []
    for value in values:
        finder.addNum(value)
        seen.append(value)
        assert finder.findMedian() == median(seen)


def test_median_is_a_float(finder):
    finder.addNum(3)
    assert isinstance(finder.findMedian(), float)
    finder.addNum(4)
    assert finder.findMedian() == 3.5


def test_empty_finder_raises(finder):
    with pytest.raises(ValueError, match="no numbers have been added"):
        finder.findMedian()


def test_generated_streams_match_sorted_copy(load_solution):
    module = load_solution("p0295_find_median_from_data_stream.py")
    rng = Random(295)
    for _ in range(100):
        finder = module.MedianFinder()
        seen = []
        for _ in range(rng.randrange(1, 40)):
            value = rng.randrange(-50, 51)
            finder.addNum(value)
            seen.append(value)
            assert finder.findMedian() == median(seen)
