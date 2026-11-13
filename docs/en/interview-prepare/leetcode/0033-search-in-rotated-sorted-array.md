---
title: 33. Search in Rotated Sorted Array
description: Binary search on a rotated sorted array by deciding, at each step, which half is still in sorted order.
---
# 33. Search in Rotated Sorted Array

## Problem in plain words

A list of distinct integers was sorted in ascending order and then rotated: some prefix was cut off and moved to the end. Given the rotated list and a target, return the target's index, or `-1` if it is absent. The search should take logarithmic time.

For example, `[2, 5, 9, 15, 18]` rotated by three positions becomes `[15, 18, 2, 5, 9]`. Searching for `5` returns `3`, and searching for `10` returns `-1`. An empty list returns `-1`. The input list is unchanged.

## Key idea

Cut the current range at its middle. A rotation creates at most one drop in value, so at least one of the two halves is still in plain sorted order, and one comparison of its end values shows which. If the target lies inside the sorted half's value range, keep that half; otherwise keep the other half.

## Step by step

1. Set `low` to `0` and `high` to the last index.
2. While `low <= high`, take `middle = (low + high) // 2`. If `nums[middle]` is the target, return `middle`.
3. If `nums[low] <= nums[middle]`, the left half from `low` to `middle` is sorted. Keep it when `nums[low] <= target < nums[middle]`; otherwise move `low` to `middle + 1`.
4. Otherwise the right half from `middle` to `high` is sorted. Keep it when `nums[middle] < target <= nums[high]`; otherwise move `high` to `middle - 1`.
5. When the range is empty, return `-1`.

Trace for `5` in `[15, 18, 2, 5, 9]`: the middle is `2` at index 2. Since `15 > 2`, the left half holds the drop, so the right half `[2, 5, 9]` is sorted. `5` lies between `2` and `9`, so `low` moves to 3. The next middle is index 3, which holds `5`.

Each step discards a half that cannot contain the target, so the target, if present, always stays inside `[low, high]`.

## Python solution

<<< ./solutions/p0033_search_in_rotated_sorted_array.py

## Complexity

Time is **O(log n)**: each loop removes about half of the remaining range. Auxiliary space is **O(1)**.

## Common mistakes

- Writing `nums[low] < nums[middle]` instead of `<=` fails when `low == middle`, for example in a two-element range.
- Mixing strict and non-strict bounds in the range test can skip the target when it equals an end value.
- Finding the rotation point first is correct but needs two searches and more edge cases.
- With duplicate values, `nums[low] == nums[middle]` no longer shows which half is sorted; that is a different problem (81. Search in Rotated Sorted Array II).

## Interview follow-ups

- How would you find the smallest value, which is the rotation point, in O(log n)?
- How does the method change when values may repeat, and what is the worst-case time then?
- How would you count how many times the array was rotated?
