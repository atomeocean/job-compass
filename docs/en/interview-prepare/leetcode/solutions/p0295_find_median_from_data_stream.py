"""Keep a running median with a max-heap for the lower half and a min-heap for the upper half."""

import heapq


class MedianFinder:
    def __init__(self) -> None:
        self.lower: list[int] = []  # max-heap, stored as negated values
        self.upper: list[int] = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lower, -num)
        heapq.heappush(self.upper, -heapq.heappop(self.lower))
        if len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))

    def findMedian(self) -> float:
        if not self.lower:
            raise ValueError("no numbers have been added")
        if len(self.lower) > len(self.upper):
            return float(-self.lower[0])
        return (-self.lower[0] + self.upper[0]) / 2
