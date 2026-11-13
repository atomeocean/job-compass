"""Guard the 322. Coin Change solution shown on its page: compare with a breadth-first search
over amounts, check unreachable amounts, zero, a large amount and invalid input."""

from random import Random

import pytest


@pytest.fixture
def solution(load_solution):
    return load_solution("p0322_coin_change.py").Solution()


def fewest_by_search(coins, amount):
    reached = {0}
    frontier = {0}
    count = 0
    while frontier:
        if amount in frontier:
            return count
        count += 1
        frontier = {
            total + coin for total in frontier for coin in coins if total + coin <= amount
        } - reached
        reached |= frontier
    return -1


@pytest.mark.parametrize(("coins", "amount", "expected"), [
    ([2, 5, 7], 12, 2),
    ([2, 5, 7], 3, -1),
    ([2, 5, 7], 0, 0),
    ([1], 0, 0),
    ([], 0, 0),
    ([], 4, -1),
    ([1, 3, 4], 6, 2),
    ([4], 8, 2),
    ([4, 4], 9, -1),
    ([9, 6, 5, 1], 11, 2),
])
def test_examples(solution, coins, amount, expected):
    original = coins.copy()
    assert solution.coinChange(coins, amount) == expected
    assert coins == original


def test_greedy_choice_is_not_enough(solution):
    # Taking the largest coin first gives 4 + 1 + 1, but 3 + 3 uses fewer coins.
    assert solution.coinChange([1, 3, 4], 6) == 2


def test_large_amount(solution):
    assert solution.coinChange([1], 10000) == 10000
    # 1426 sevens make 9982; the remaining 18 takes 6 threes.
    assert solution.coinChange([7, 3], 10000) == 1432


@pytest.mark.parametrize(("coins", "amount", "message"), [
    ([1, 2], -1, "amount must not be negative"),
    ([0, 1], 3, "coin values must be positive"),
    ([-2, 5], 3, "coin values must be positive"),
])
def test_invalid_input(solution, coins, amount, message):
    with pytest.raises(ValueError, match=message):
        solution.coinChange(coins, amount)


def test_generated_inputs_match_search(solution):
    rng = Random(322)
    for _ in range(200):
        coins = [rng.randrange(1, 13) for _ in range(rng.randrange(4))]
        amount = rng.randrange(40)
        assert solution.coinChange(coins, amount) == fewest_by_search(coins, amount)
