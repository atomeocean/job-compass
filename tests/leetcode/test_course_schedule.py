"""Guard the 207. Course Schedule solution shown on its page: compare with a search over all
course orders, check cycles, self-loops, repeated pairs, long chains and invalid course numbers."""

from itertools import permutations
from random import Random

import pytest


@pytest.fixture
def solution(load_solution):
    return load_solution("p0207_course_schedule.py").Solution()


def has_valid_order(num_courses, prerequisites):
    for order in permutations(range(num_courses)):
        position = {course: index for index, course in enumerate(order)}
        if all(position[required] < position[course] for course, required in prerequisites):
            return True
    return False


@pytest.mark.parametrize(("num_courses", "prerequisites", "expected"), [
    (4, [[1, 0], [2, 1], [3, 1]], True),
    (4, [[1, 0], [2, 1], [3, 1], [0, 3]], False),
    (0, [], True),
    (1, [], True),
    (1, [[0, 0]], False),
    (2, [[1, 0], [1, 0]], True),
    (2, [[1, 0], [0, 1]], False),
    (3, [], True),
    (5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]], True),
    (5, [[1, 0], [2, 1], [3, 4], [4, 3]], False),
])
def test_examples(solution, num_courses, prerequisites, expected):
    original = [pair.copy() for pair in prerequisites]
    assert solution.canFinish(num_courses, prerequisites) is expected
    assert prerequisites == original


def test_generated_inputs_match_order_search(solution):
    rng = Random(207)
    for _ in range(200):
        num_courses = rng.randrange(6)
        pairs = []
        if num_courses:
            pairs = [
                [rng.randrange(num_courses), rng.randrange(num_courses)]
                for _ in range(rng.randrange(8))
            ]
        assert solution.canFinish(num_courses, pairs) is has_valid_order(num_courses, pairs)


def test_long_chain_and_long_cycle_do_not_need_recursion(solution):
    chain = [[course, course - 1] for course in range(1, 3000)]
    assert solution.canFinish(3000, chain) is True
    assert solution.canFinish(3000, chain + [[0, 2999]]) is False


@pytest.mark.parametrize("prerequisites", [[[2, 0]], [[0, 2]], [[-1, 0]], [[0, -1]]])
def test_course_numbers_out_of_range(solution, prerequisites):
    with pytest.raises(ValueError, match="between 0 and numCourses - 1"):
        solution.canFinish(2, prerequisites)
