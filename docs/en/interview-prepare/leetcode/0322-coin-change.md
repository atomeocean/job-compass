---
title: 322. Coin Change
description: Build the fewest-coins answer for every amount from 0 up with bottom-up dynamic programming.
---
# 322. Coin Change

## Problem in plain words

Given coin values and a target amount, return the fewest coins whose values add up to the amount. Each coin value can be used any number of times. Return `-1` if no combination makes the amount.

For example, with coins `[2, 5, 7]` the amount `12` needs two coins, `5 + 7`; `2 + 5 + 5` also works but uses three. The amount `3` cannot be made, so the answer is `-1`. An amount of `0` needs zero coins.

The usual problem guarantees positive coin values and a non-negative amount. This implementation raises `ValueError` for a negative amount or a coin value of zero or less, instead of returning a wrong answer or looping. The input list is unchanged.

## Key idea

Let `fewest[t]` be the fewest coins that make the amount `t`. The last coin used for `t` is one of the coin values `c`, and the coins before it make `t - c` as cheaply as possible. So `fewest[t]` is one more than the smallest `fewest[t - c]` over the coins that fit. Filling the table from `0` upward means every value it reads is already final.

## Step by step

1. Check the input. Set `fewest[0]` to `0` and every other entry to `amount + 1`, a value no real answer can reach, because even all-ones coins use at most `amount` coins.
2. For each total `t` from `1` to `amount`, try every coin `c` with `c <= t`.
3. If `fewest[t - c] + 1` is smaller than `fewest[t]`, store it.
4. At the end, return `fewest[amount]` if it is at most `amount`; otherwise the amount was never reached, so return `-1`.

For coins `[2, 5, 7]`: `fewest[2] = 1`, `fewest[4] = 2`, `fewest[5] = 1`, `fewest[7] = 1`, and `fewest[12]` takes the smaller of `fewest[10] + 1 = 3`, `fewest[7] + 1 = 2` and `fewest[5] + 1 = 2`, which is `2`. `fewest[3]` stays at the unreachable value.

Taking the largest coin first does not work in general: with coins `[1, 3, 4]` and amount `6`, it picks `4 + 1 + 1`, while `3 + 3` uses one coin fewer. The table tries every last coin, so it never commits to a bad early choice.

## Python solution

<<< ./solutions/p0322_coin_change.py

## Complexity

For amount `A` and `k` coin values, time is **O(A * k)**: each of the `A` totals tries every coin once. Auxiliary space is **O(A)** for the table.

## Common mistakes

- Using `float("inf")` works, but returning it without converting to `-1` fails the problem.
- Initializing the table with `0` instead of an unreachable value makes every amount look reachable with zero coins.
- A greedy largest-coin-first rule is wrong for many coin sets.
- Plain recursion without remembering results repeats the same subproblems and takes exponential time.

## Interview follow-ups

- How would you count the number of different combinations that make the amount (518. Coin Change II)?
- How would you return the coins themselves, not only their count?
- How would a breadth-first search over amounts find the same answer, and when can it stop before visiting every amount?
