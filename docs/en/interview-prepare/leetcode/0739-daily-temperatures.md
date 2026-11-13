---
title: 739. Daily Temperatures
description: Answer how long each day waits for a warmer day with a monotonic stack of unanswered days.
---
# 739. Daily Temperatures

## Problem in plain words

Given daily temperatures, return for each day how many days later the next strictly warmer temperature comes. If no warmer day follows, the answer for that day is `0`.

For example, `[61, 58, 60, 65, 63, 63, 70]` gives `[3, 1, 1, 3, 2, 1, 0]`. The first day's `61` waits three days for `65`. The two `63` days are not warmer than each other, so both wait for `70`. The last day has no later day, so its answer is `0`.

An empty list returns `[]`. The input list is unchanged.

## Key idea

Keep a stack of days that are still waiting for a warmer day. Their temperatures never rise from the bottom of the stack to the top, because a warmer day would already have answered the days below it. When a new day arrives, it answers every waiting day at the top that is colder than it, then waits itself.

## Step by step

1. Start with an answer list of zeros and an empty stack of day indices.
2. For each day, look at the top of the stack. While that waiting day is strictly colder than today, pop it and set its answer to today's index minus its index.
3. Push today's index onto the stack.
4. Days still on the stack at the end never see a warmer day, so their answers stay `0`.

Trace with the example: day 1 (`58`) waits on top of day 0 (`61`). Day 2 (`60`) answers day 1 with `1` but not day 0. Day 3 (`65`) answers day 2 with `1` and day 0 with `3`. Days 4 and 5 (`63`, `63`) both wait, since equal is not warmer. Day 6 (`70`) answers day 5 with `1`, day 4 with `2` and day 3 with `3`.

## Python solution

<<< ./solutions/p0739_daily_temperatures.py

## Complexity

Time is **O(n)** for `n` days: each day is pushed once and popped at most once, so the inner loop runs at most `n` times in total. Auxiliary space is **O(n)** for the stack in the worst case, a run of falling temperatures. The answer list also uses O(n).

## Common mistakes

- Popping on `<=` instead of `<` treats an equal temperature as warmer.
- Storing temperatures instead of indices loses the distance needed for the answer.
- Checking every later day for every day is correct but takes O(n^2) time.
- Forgetting the `while` and popping only one day leaves colder days unanswered.

## Interview follow-ups

- How would you scan from right to left instead, and what would the stack hold then?
- How does the same stack find the next greater element in a circular list (503. Next Greater Element II)?
- If temperatures lie in a small fixed range, how could you answer without a stack?
