---
title: Fortinet OA
description: Fortinet 2025年6月19日OA
outline: deep
---
# Fortinet Online Assessment

```text
import asyncio
import concurrent.futures
 
def blocking_io():
    with open('test.txt', 'w') as f:
        for i in range(10000):
            f.write('test')
    return 'io completed'
 
async def main():
    with concurrent.futures.ThreadPoolExecutor() as executor:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(executor, blocking_io)
        print(result)
 
if __name__ == "__main__":
    asyncio.run(main())
 
Which of the following modifications will NOT allow the program to work as intended?
 
Pick ONE option
 
Replace concurrent.futures.ThreadPoolExecutor() with concurrent.futures.ProcessPoolExecutor()
Replace loop = asyncio.get_event_loop() with loop = asyncio.new_event_loop()
Replace result = await loop.run_in_executor(executor, blocking_io) with result = blocking_io()
Replace asyncio.run(main()) with main()
 
--------
 
from abc import ABC, abstractmethod
 
class Quacker(ABC):
    @abstractmethod
    def quack(self):
        pass
 
class Duck:
    def quack(self):
        return "Quack!"
 
class Cat:
    def quack(self):
        return "Meow!"
 
def is_a_quacker(obj):
    if type(obj) is Quacker:
        return True
    return False
 
Quacker.register(Duck)
 
duck = Duck()
cat = Cat()
 
which of the following code snippets will return True?
 
Pick ONE option
 
print(is_a_quacker(duck))
print(is_a_quacker(cat))
print(issubclass(Duck, Quacker))
print(issubclass(Cat, Quacker))
 
--------
 
def count_up_to(n):
    count = 0
    for _ in range(n):
        count += 1
    return count
 
 
which one of the following versions of the main() function would decrease the total execution time of count_up_to?
 
Pick ONE option
 
----
 
import threading
def main():
    n = 10 ** 7
    t1 = threading.Thread(target=count_up_to, args=(n,))
    t2 = threading.Thread(target=count_up_to, args=(n,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
 
----
 
import multiprocessing
def main():
    n = 10 ** 7
    p1 = multiprocessing.Process(target=count_up_to, args=(n,))
    p2 = multiprocessing.Process(target=count_up_to, args=(n,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
 
----
 
def main():
    n = 10 ** 7
    count_up_to(n)
    count_up_to(n)
 
----
 
import threading
import time
 
def main():
    n = 10 ** 7
    t1 = threading.Thread(target=count_up_to, args=(n,))
    t2 = threading.Thread(target=count_up_to, args=(n,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    time.sleep(1)
 
--------
 
import threading
 
class SharedCounter:
    def __init__(self):
        self.value = 0
        self._value_lock = threading.Lock()
 
    def increment(self, delta=1):
        with self._value_lock:
            self.value += delta
 
    def get_value(self):
        with self._value_lock:
            return self.value
 
def worker(counter, num_iters):
    for _ in range(num_iters):
        counter.increment()
 
if __name__ == "__main__":
    counter = SharedCounter()
    num_iters = 10000
    num_workers = 5
    threads = [threading.Thread(target=worker, args=(counter, num_iters)) for _ in range(num_workers)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    print(counter.get_value())
 
Pick ONE option
 
It is guaranteed to print 50000
It may print a number less than 50000
It may print a number more than 50000
The program may raise a threading-related exception
 
--------
 
Madam C.J. Walker's Business Plan
 
Madam C.J. Walker, known as the first African-American businesswoman in America, had a business model involving the sale of cosmetics and perfumes for women, which can be likened to a modified 0-1 knapsack problem.
 
There are n different products available for purchase and resale. The cost of the i item is given by cost[i], and it can be resold for a profit of 2 ** i
 
Given the total available to x to invest, determine the maximum profit that can be generated with the given amount of money. Since the answer can be quite large, return the result modulo (10 ** 9 + 7).
 
Example
Suppose there are n = 5 items with costs cost = [10, 20, 14, 40, 50], and Walker's initial amount of money is x = 70.
 
Some combinations of items (0-based indexing) Walker can buy are:
- Items 0, 1, and 2 for a cost of 44 and obtain a profit of 2 ** 0 + 2 ** 1 + 2 ** 2 = 7
- Items 0 and 4 for a cost of 60 and obtain a profit of 2 ** 0 + 2 ** 4 = 17
- Items 1 and 4 for a cost of 70 and obtain a profit of 2 ** 1 + 2 ** 4 = 18
- Items 2 and 4 for a cost of 64 and obtain a profit of 2 ** 2 + 2 ** 4 = 20
 
Out of all the possible combinations, the maximum profit is 20 when purchasing items 2 and 4 for a cost of 64.
 
def calculateMaximumProfit(cost, x):
 
--------
 
K-Means Clustering
 
In a k-means clustering problem, a dataset contains n data points, where i data point is represented by the feature vector location[i], The goal is to create k clusters. where the cluster centers or the cluster centroids can be placed at any point in the feature space. The overall quality of the clustering is measured by the maximum distance between any data point and its nearest cluster center.
 
The best possible quality is achieved by optimally placing the cluster centers to minimize this maximum distance. Determine this maximum distance between any data point and its nearest cluster center.
 
Note: The distance between two feature points x and y is defined as |x - y|. where |x| denotes the absolute value of x.
 
Example
n = 5
location =[4, 1, 6, 7, 2]
k = 2
 
Let the cluster centers be placed at points 3 and 7.
 
Current Location | Closest Cluster Center | Distance
4                | 3                      | |4 - 3| = 1
1                | 3                      | |1 - 3| = 2
6                | 7                      | |6 - 7| = 1
7                | 7                      | |7 - 7| = 0
2                | 3                      | |2 - 3| = 1
 
Hence, the maximum of all distances is 2.
 
def getMaximumDistance(location, k):
 
--------
 
Signal Pings
 
You have an array of n binary signals, where each signal initially has a value of 0. There are n different pings made to these signals, changing their value from 0 to 1. The i ping affects the signal at index ping[i].
 
After each ping, the processor sorts the array by performing sweeps from left to right, swapping adjacent elements where signal[i] = 1 and signal[i + 1] = 0. The processor stops when no swaps are made in a sweep.
 
Determine the number of sweeps required after each ping to sort the array.
 
Note: Each signal is only pinged once.
 
Example
 
Given n = 4. ping =[1, 2, 4, 3]
 
Ping | Operations required to process signals | signal after each Ping
1    | Only one sweep is sufficient to sort   | [1, 0, 0, 0]
     | the array into [0, 0, 0, 1]. One other |
     | sweep is run with no swaps. Total      |
     | sweeps = 2.                            |
2    | 2 sweeps will sort the array.          | [1, 1, 0, 0]
     | Similarly, another sweep with no       |
     | swaps. Total sweeps = 3.               |
3    | 2 sweeps will sort the array.          | [1, 1, 0, 1]
     | Similarly, another sweep with no       |
     | swaps. Total sweeps = 3.               |
4    | signal is already sorted. So, just one | [1, 1, 1, 1]
     | sweep with no swaps. Total sweeps      |
     | = 1.                                   |
 
sweeps = [2, 3, 3, 1]
 
 
def getRequiredSweeps(ping):
```

### 引用来源
https://pastebin.com/305gzf20