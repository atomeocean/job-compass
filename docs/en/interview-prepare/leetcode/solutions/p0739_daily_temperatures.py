"""Count the days until a warmer temperature with a monotonic stack of day indices."""


class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        answer = [0] * len(temperatures)
        waiting: list[int] = []
        for day, temperature in enumerate(temperatures):
            while waiting and temperatures[waiting[-1]] < temperature:
                earlier = waiting.pop()
                answer[earlier] = day - earlier
            waiting.append(day)
        return answer
