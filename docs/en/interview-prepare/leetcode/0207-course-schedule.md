---
title: 207. Course Schedule
description: Decide whether a prerequisite graph has an order that finishes every course, using Kahn's topological sort.
---
# 207. Course Schedule

## Problem in plain words

There are `numCourses` courses, numbered `0` to `numCourses - 1`. Each prerequisite pair `[course, required]` means `required` must be finished before `course`. Return whether some order lets a student finish every course. That is possible exactly when the prerequisites contain no cycle.

For example, with four courses and `[[1, 0], [2, 1], [3, 1]]`, the order `0, 1, 2, 3` works, so the answer is `True`. Adding `[0, 3]` creates the cycle `0 -> 1 -> 3 -> 0`: course 0 now waits for course 3, which waits for course 1, which waits for course 0. The answer becomes `False`.

A course that lists itself as its own prerequisite can never start. A repeated pair is allowed and changes nothing. Zero courses return `True`. This implementation raises `ValueError` for a course number outside the valid range instead of failing with an index error. The input is unchanged.

## Key idea

Count, for every course, how many prerequisites it still waits on. Courses that wait on nothing can be taken now. Taking a course releases the courses it unlocks; any course whose count drops to zero becomes ready too. If this process takes every course, an order exists. Courses on a cycle never reach zero, so they are never taken.

## Step by step

1. Build `unlocks`, a list for each course of the courses that require it, and `waiting_on`, each course's number of unfinished prerequisites.
2. Put every course with `waiting_on` equal to zero in a queue.
3. Remove a course from the queue and count it as finished.
4. For each course it unlocks, subtract one from that course's `waiting_on`. When it reaches zero, add that course to the queue.
5. When the queue is empty, return whether the finished count equals `numCourses`.

In the cycle example, course 0 waits on course 3, course 1 on course 0, and courses 2 and 3 on course 1. No course starts at zero, so nothing is ever taken and the answer is `False`.

The order in which courses leave the queue is a topological order of the graph: every course leaves only after all of its prerequisites have left.

## Python solution

<<< ./solutions/p0207_course_schedule.py

## Complexity

For `V` courses and `E` prerequisite pairs, time is **O(V + E)**: each course enters the queue at most once, and each pair is processed once when its required course is taken. Auxiliary space is **O(V + E)** for the lists and counts.

## Common mistakes

- Reversing the pair direction still gives the right yes or no here, but gives a wrong order in the follow-up that asks for the order.
- Using `[[]] * numCourses` makes every course share one list.
- A recursive depth-first search with only a "visited" mark cannot tell a cycle from a course reached twice; it needs a separate "on the current path" state.
- Recursive depth-first search can exceed Python's recursion limit on a long chain of prerequisites; the queue avoids that.

## Interview follow-ups

- How would you return one valid order instead of `True` or `False` (210. Course Schedule II)?
- How would you find the courses that sit on a cycle?
- If several courses can be taken in the same term, how would you compute the fewest terms needed?
