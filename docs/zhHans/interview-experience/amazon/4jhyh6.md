---
title: Business Analyst SQL
description: Amazon Business Analyst SQL 面试经验
outline: deep
---
# Amazon Business Analyst SQL 面试经验

<InterviewDetail />

## 面试详情

### 第一轮：Coding
她在coding轮问了两个SQL问题。第一个问题是取出表中2024年每个月的平均销售价格、每月销量售出产品数以及总收入。第二个问题是取出每个产品类别下销售额第三高的产品。

- 表1 order包括以下Fields：order id，order date，product id，selling price
- 表2 product包括以下Fields：product id，current price，created at，product category

## 投稿人的理解与总结

这轮面试考察的是基本的SQL技术素养，主要有三个方面。具体来说包括对表的理解，对业务的理解，以及与需求方的沟通确认。第一方面需要通过仔细阅读和询问表的相关信息来解决，第二方面需要确认基本的会计计算公式来解决。第三方面需要仔细询问和转述问题来解决。

推荐的代码答案是：

问题1通过初步梳理数据，筛选order date然后group by order date里的月份来得到。这里假设order表的一行就是售出的一件商品（表里没有数量字段），所以用COUNT(*)计算每月售出产品数；如果题目指的是售出的产品种类数，就改用COUNT(DISTINCT o.`product id`)。

```sql
SELECT
    EXTRACT(MONTH FROM o.`order date`) AS sales_month,
    COUNT(*) AS products_sold,
    AVG(o.`selling price`) AS average_sales_price,
    SUM(o.`selling price`) AS total_revenue
FROM
    `order` o
WHERE
    o.`order date` >= '2024-01-01' AND o.`order date` < '2025-01-01'
GROUP BY
    EXTRACT(MONTH FROM o.`order date`)
ORDER BY
    sales_month;
```

问题2通过product id和product category把两张表JOIN起来，然后计算总销售额，最后排序并找出排名第3的产品来解决。注意原题是「3rd highest selling」，既可以理解为按销售额排，也可以理解为按销量排，面试时要先跟面试官确认；下面按销售额计算，如果按销量，把SUM(o.`selling price`)换成COUNT(*)即可。

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
    sales_rank = 3;
```

这里用DENSE_RANK：销售额并列的产品排名相同，排名不会因为前面有并列而跳号，只要类别里有至少三档不同的销售额，就一定能取到第三高的那一档；但如果这一档有并列，会返回多个产品。如果面试官要求每个类别只返回一个产品，就改用ROW_NUMBER，并说明并列时按什么规则取舍。这个选择本身也值得在面试中讲出来。

可能踩坑的地方包括用created at和current price来计算总收入，这会导致计算错误，应该使用selling price计算2024年的总收入。此外，BETWEEN '2024-01-01' AND '2024-12-31' 在datetime字段上只算到12-31 00:00:00，会漏掉12月31日当天的订单，推荐用 >= '2024-01-01' AND < '2025-01-01'（上面的示例代码就是这样写的）。

<ReferenceSource
:sources="[
{
title: 'Amazon Interview Experience | Business Analyst',
link: 'https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-business-analyst/',
site: 'GeeksforGeeks',
author: '匿名用户',
date: '2024-09-23',
category: '海外面经'
}
]"
/>
