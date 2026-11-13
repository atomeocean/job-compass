---
title: 295. Find Median from Data Stream
description: Keep the lower half in a max-heap and the upper half in a min-heap so each median read is constant time.
---
# 295. Find Median from Data Stream

## Problem in plain words

Design a class that receives integers one at a time and can report the median of all numbers received so far at any moment. With an odd count, the median is the middle value in sorted order. With an even count, it is the average of the two middle values.

For example, after adding `5` the median is `5.0`. After adding `15` it is `10.0`. After adding `1` the sorted values are `[1, 5, 15]`, so it is `5.0`. After adding `3` they are `[1, 3, 5, 15]`, so it is `(3 + 5) / 2 = 4.0`.

The usual problem calls `findMedian` only after at least one number has been added. This implementation raises `ValueError` if it is called earlier, and it always returns a float.

## Key idea

Split the numbers into a lower half and an upper half. Keep the lower half in a max-heap, so its largest value is at the top, and the upper half in a min-heap, so its smallest value is at the top. If the halves stay balanced and every lower value is at most every upper value, the median is read from the two tops. Python's `heapq` is a min-heap, so the lower half stores negated values.

## Step by step

1. Push the new number into the lower half.
2. Move the lower half's largest value into the upper half. This keeps every lower value at most every upper value, whichever half the new number belongs in.
3. If the upper half is now larger than the lower half, move its smallest value back to the lower half.
4. After these steps, the lower half has either the same number of values as the upper half or exactly one more.
5. For the median, return the lower top when the lower half is larger; otherwise return the average of the two tops.

Trace with the example: after `5`, the lower half holds `5`. After `15`, the halves are `5` and `15`, so the median is `10.0`. After `1`, the lower half holds `1, 5` and the upper half `15`, so the median is the lower top `5`. After `3`, the lower half holds `1, 3` and the upper half `5, 15`, so the median is `(3 + 5) / 2`.

## Python solution

<<< ./solutions/p0295_find_median_from_data_stream.py

## Complexity

Each `addNum` call does a constant number of heap operations, so it takes **O(log n)** time for `n` numbers added so far. Each `findMedian` call takes **O(1)** time. Space is **O(n)** for the two heaps.

## Common mistakes

- Pushing the new number straight into the smaller half can break the order between halves; route it through one heap first.
- Forgetting to negate when pushing or reading the lower half returns the wrong top.
- Integer division (`//`) on an even count turns `3.5` into `3`.
- Sorting the whole list on every call is correct but takes O(n log n) per median.

## Interview follow-ups

- If all numbers lie between 0 and 100, how could counting buckets give a constant-time median?
- How would you support removing a number, as in 480. Sliding Window Median?
- If 99% of the numbers lie in a small range, how would you combine buckets with a fallback for the rest?
