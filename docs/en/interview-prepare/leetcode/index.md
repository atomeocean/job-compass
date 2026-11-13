---
title: LeetCode Interview Patterns
description: Twelve Python solutions covering common interview patterns with walkthroughs and tested source code.
---
# LeetCode Interview Patterns

These twelve problems introduce reusable interview techniques. Each page includes a short problem paraphrase, an original example, the main invariant, a walkthrough, complexity, common mistakes, and follow-up questions.

## Hash maps

- [1. Two Sum](/en/interview-prepare/leetcode/0001-two-sum): remember earlier values to find a complement.

## Sliding windows

- [3. Longest Substring Without Repeating Characters](/en/interview-prepare/leetcode/0003-longest-substring-without-repeating-characters): move a boundary to keep a window valid.

## Two pointers

- [15. 3Sum](/en/interview-prepare/leetcode/0015-3sum): sort once, fix one value, and close two pointers while skipping duplicates.

## Binary search

- [33. Search in Rotated Sorted Array](/en/interview-prepare/leetcode/0033-search-in-rotated-sorted-array): decide which half is still sorted before discarding the other.

## Sorting and intervals

- [56. Merge Intervals](/en/interview-prepare/leetcode/0056-merge-intervals): sort first so each interval needs only one comparison with the current merged range.

## Hash maps and linked lists

- [146. LRU Cache](/en/interview-prepare/leetcode/0146-lru-cache): combine fast lookup with a mutable order of use.

## Graph traversal on grids

- [200. Number of Islands](/en/interview-prepare/leetcode/0200-number-of-islands): count connected components with iterative BFS.

## Topological sort

- [207. Course Schedule](/en/interview-prepare/leetcode/0207-course-schedule): take courses whose prerequisites are done and detect a cycle by what is left over.

## Heaps

- [295. Find Median from Data Stream](/en/interview-prepare/leetcode/0295-find-median-from-data-stream): balance a max-heap and a min-heap so the median sits at their tops.

## Dynamic programming

- [322. Coin Change](/en/interview-prepare/leetcode/0322-coin-change): build the answer for every smaller amount first, and see why greedy fails.

## Frequency selection

- [347. Top K Frequent Elements](/en/interview-prepare/leetcode/0347-top-k-frequent-elements): select with frequency buckets and discuss the heap alternative.

## Monotonic stacks

- [739. Daily Temperatures](/en/interview-prepare/leetcode/0739-daily-temperatures): keep unanswered days on a stack and answer them when a warmer day arrives.

## How to practice

1. State the input assumptions and expected output before coding.
2. Explain what remains true after every iteration or operation.
3. Trace the example, then try empty input, repeated values, and boundary cases.
4. Derive time and space from the operations and stored data.
5. Answer a follow-up by explaining which assumption or data structure changes.

The Python files use LeetCode's `Solution` method names, or the class names `LRUCache` and `MedianFinder` for the two design problems, and require Python 3.9 or later. Pages import the complete solution files directly; tests under `tests/leetcode/` load those same files. Each page explicitly describes any behavior added beyond the usual problem constraints.
