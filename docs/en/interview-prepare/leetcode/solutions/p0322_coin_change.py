"""Find the fewest coins that make an amount with bottom-up dynamic programming."""


class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        if amount < 0:
            raise ValueError("amount must not be negative")
        if any(coin <= 0 for coin in coins):
            raise ValueError("coin values must be positive")

        unreachable = amount + 1
        fewest = [0] + [unreachable] * amount
        for total in range(1, amount + 1):
            for coin in coins:
                if coin <= total and fewest[total - coin] + 1 < fewest[total]:
                    fewest[total] = fewest[total - coin] + 1
        return fewest[amount] if fewest[amount] <= amount else -1
