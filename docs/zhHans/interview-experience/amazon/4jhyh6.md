---
title: Business-Analyst
description: Amazon New Grad Business Analyst 面试经验
outline: deep
---
# Amazon New Grad Business Analyst 面试经验

<InterviewDetail />

## 面试详情

### 第一轮：Coding
她在coding轮问了两个SQL问题。第一个问题是取出表中2024年每个月的平均销售价格、每月销量售出产品数以及总收入。第二个问题是取出每个产品类别下销售额第三高的产品。
表1 order包括以下Fields：order id，order date，product id，selling price
表2 product包括以下Fields：product id，current price，created at，product category

## 投稿人的理解与总结

这轮面试考察的是基本的SQL技术素养，主要有三个方面。具体来说包括对表的理解，对业务的理解，以及和需求方的理解。第一方面需要通过仔细阅读和询问表的相关信息来解决，第二方面需要确认基本的会计计算公式来解决。第三方面需要仔细询问和转述问题来解决。
推荐的代码答案是：
问题1通过初步梳理数据，筛选order date然后group by order date里的月份来得到

```sql
SELECT
    EXTRACT(MONTH FROM o.`order date`) AS sales_month,
    AVG(o.`selling price`) AS average_sales_price,
    SUM(o.`selling price`) AS total_revenue
FROM
    `order` o
WHERE
    o.`order date` >= '2024-01-01' AND o.`order date` <= '2025-01-01'
GROUP BY
    EXTRACT(MONTH FROM o.`order date`)
ORDER BY
    sales_month;
```

问题2通过product id和product category把两张表JOIN起来，然后计算总销售额，最后排序并找出排名第3的产品来解决。

```sql
WITH ProductSales AS (
    -- 第一步：连接两表，计算每个产品在其类别下的总销售额
    SELECT
        p.`product category`,
        o.`product id`,
        SUM(o.`selling price`) AS total_product_sales
    FROM
        `order` o
    JOIN
        `product` p ON o.`product id` = p.`product id`
    GROUP BY
        p.`product category`,
        o.`product id`
),
RankedProducts AS (
    -- 第二步：在每个产品类别内部，按总销售额从高到低排名
    SELECT
        `product category`,
        `product id`,
        total_product_sales,
        DENSE_RANK() OVER (
            PARTITION BY `product category`
            ORDER BY total_product_sales DESC
        ) AS sales_rank
    FROM
        ProductSales
)
-- 第三步：过滤出排名第三的产品
SELECT
    `product category`,
    `product id`,
    total_product_sales
FROM
    RankedProducts
WHERE
    sales_rank = 3
```

可能踩坑的地方包括用created at和current price来计算总收入，这会导致计算错误，应该使用selling price计算2024年的总收入。此外用时间筛选订单的时候如果用BETWEEN AND会被处理为2024-12-31 00:00:00，因此会遗漏2024/12/31那一整天的订单。

<ReferenceSource
:sources="[
{
title: 'Amazon Interview Experience | Business Analyst',
link: 'https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-business-analyst/',
site: 'GeeksforGeeks',
author: '匿名',
date: '2024-09-23',
category: '海外面经'
}
]"
/>
