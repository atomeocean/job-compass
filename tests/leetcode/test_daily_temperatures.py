"""Guard the 739. Daily Temperatures solution shown on its page: compare with a direct
look-ahead, check equal temperatures, falling and rising runs, and that the input is unchanged."""

from random import Random

import pytest


@pytest.fixture
def solution(load_solution):
    return load_solution("p0739_daily_temperatures.py").Solution()


def look_ahead(temperatures):
    answer = []
    for day, temperature in enumerate(temperatures):
        wait = 0
        for later in range(day + 1, len(temperatures)):
            if temperatures[later] > temperature:
                wait = later - day
                break
        answer.append(wait)
    return answer


@pytest.mark.parametrize(("temperatures", "expected"), [
    ([61, 58, 60, 65, 63, 63, 70], [3, 1, 1, 3, 2, 1, 0]),
    ([], []),
    ([50], [0]),
    ([40, 40, 40], [0, 0, 0]),
    ([90, 80, 70, 60], [0, 0, 0, 0]),
    ([60, 70, 80, 90], [1, 1, 1, 0]),
    ([70, 60, 60, 60, 71], [4, 3, 2, 1, 0]),
])
def test_examples(solution, temperatures, expected):
    original = temperatures.copy()
    assert solution.dailyTemperatures(temperatures) == expected
    assert temperatures == original


def test_long_falling_run_then_one_warm_day(solution):
    temperatures = list(range(100, 30, -1)) + [101]
    expected = [len(temperatures) - 1 - day for day in range(len(temperatures) - 1)] + [0]
    assert solution.dailyTemperatures(temperatures) == expected


def test_generated_inputs_match_look_ahead(solution):
    rng = Random(739)
    for _ in range(200):
        temperatures = [rng.randrange(30, 41) for _ in range(rng.randrange(25))]
        assert solution.dailyTemperatures(temperatures) == look_ahead(temperatures)
