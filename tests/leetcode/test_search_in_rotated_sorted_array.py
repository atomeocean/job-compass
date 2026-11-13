"""Guard the 33. Search in Rotated Sorted Array solution shown on its page: every rotation,
present and absent targets, the empty array, and that the input list is unchanged."""

import pytest


@pytest.fixture
def solution(load_solution):
    return load_solution("p0033_search_in_rotated_sorted_array.py").Solution()


@pytest.mark.parametrize(("nums", "target", "expected"), [
    ([15, 18, 2, 5, 9], 5, 3),
    ([15, 18, 2, 5, 9], 15, 0),
    ([15, 18, 2, 5, 9], 18, 1),
    ([15, 18, 2, 5, 9], 9, 4),
    ([15, 18, 2, 5, 9], 10, -1),
    ([], 3, -1),
    ([7], 7, 0),
    ([7], 4, -1),
    ([3, 1], 1, 1),
    ([3, 1], 3, 0),
    ([1, 3], 2, -1),
])
def test_examples(solution, nums, target, expected):
    original = nums.copy()
    assert solution.search(nums, target) == expected
    assert nums == original


def test_every_rotation_and_target(solution):
    for length in range(10):
        base = [value * 3 - 4 for value in range(length)]
        for shift in range(max(length, 1)):
            nums = base[shift:] + base[:shift]
            for index, value in enumerate(nums):
                assert solution.search(nums, value) == index
            missing = [base[0] - 1 if base else 0] + [value + 1 for value in base]
            for target in missing:
                assert solution.search(nums, target) == -1
