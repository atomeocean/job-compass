"""Guard the 15. 3Sum solution shown on its page: compare with a brute-force search, check
duplicate handling, sorted output, and that the input list is unchanged."""

from itertools import combinations
from random import Random

import pytest


@pytest.fixture
def solution(load_solution):
    return load_solution("p0015_3sum.py").Solution()


def brute_force(nums):
    found = {tuple(sorted(triple)) for triple in combinations(nums, 3) if sum(triple) == 0}
    return [list(triple) for triple in sorted(found)]


@pytest.mark.parametrize(("nums", "expected"), [
    ([-3, 1, 2, -1, 0, 1, -2], [[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]),
    ([-4, 2, 2, 0, -2, 4], [[-4, 0, 4], [-4, 2, 2], [-2, 0, 2]]),
    ([0, 0, 0, 0], [[0, 0, 0]]),
    ([1, 2, -2, -1], []),
    ([0, 0], []),
    ([], []),
    ([5, 6, 7], []),
    ([-5, -6, -7], []),
])
def test_examples(solution, nums, expected):
    original = nums.copy()
    assert solution.threeSum(nums) == expected
    assert nums == original


def test_many_duplicates_give_each_triplet_once(solution):
    nums = [-1] * 20 + [0] * 20 + [1] * 20 + [2] * 20
    assert solution.threeSum(nums) == [[-1, -1, 2], [-1, 0, 1], [0, 0, 0]]


def test_generated_inputs_match_brute_force(solution):
    rng = Random(15)
    for _ in range(200):
        nums = [rng.randrange(-6, 7) for _ in range(rng.randrange(13))]
        assert solution.threeSum(nums) == brute_force(nums)
