"""List the distinct zero-sum triplets with sorting and two pointers."""


class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        values = sorted(nums)
        triplets: list[list[int]] = []
        for first in range(len(values) - 2):
            if values[first] > 0:
                break
            if first > 0 and values[first] == values[first - 1]:
                continue
            left, right = first + 1, len(values) - 1
            while left < right:
                total = values[first] + values[left] + values[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    triplets.append([values[first], values[left], values[right]])
                    left += 1
                    right -= 1
                    while left < right and values[left] == values[left - 1]:
                        left += 1
                    while left < right and values[right] == values[right + 1]:
                        right -= 1
        return triplets
