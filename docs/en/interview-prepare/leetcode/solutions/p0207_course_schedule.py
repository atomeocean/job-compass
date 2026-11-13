"""Decide whether every course can be finished with Kahn's topological sort."""

from collections import deque


class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        unlocks: list[list[int]] = [[] for _ in range(numCourses)]
        waiting_on = [0] * numCourses
        for course, required in prerequisites:
            if not (0 <= course < numCourses and 0 <= required < numCourses):
                raise ValueError("course numbers must be between 0 and numCourses - 1")
            unlocks[required].append(course)
            waiting_on[course] += 1

        ready = deque(course for course in range(numCourses) if waiting_on[course] == 0)
        finished = 0
        while ready:
            course = ready.popleft()
            finished += 1
            for next_course in unlocks[course]:
                waiting_on[next_course] -= 1
                if waiting_on[next_course] == 0:
                    ready.append(next_course)
        return finished == numCourses
