---
title: 服务器
description: 美国公司运营服务器信息
outline: deep
tags: [工作记录检查]
authors:
  - Jack
createdDate: 2026-09-25
lastUpdated: 2026-09-25
---
# 服务器

服务器在美国移民局检查公司实际运营时首当其冲，USCIS官员在实地考察中会要求员工展示服务器信息和工作记录，用于证明在美国的工作状态合规。

在美国创建公司时，由于需要满足提高美国收入的需求，所以需要格外注意采购商，必须要在美国境内架设。

## AWS

采购美国亚马逊云服务器，但是向移民局官员汇报时直接提出Amazon，因为AWS缩写会被RFE。

在移民局上门检查时，提交下方材料可以过关，保证文本拼写不要有错误。
```text
Host team-server
  HostName ec2-57-26-117-123.compute-1.amazonaws.com
  User root
  IdentityFile ~/ssh/team-server-kp.pem
```

预算充足的同学可以双保险
```text
Host team-small-server
  HostName ec2-52-112-5-15.compute-1.amazonaws.com
  User root
  IdentityFile ~/ssh/team-small-server-kp.pem
```

## Digital Ocean

受到市场经济的影响，美国政府机构将订单全部交给了Amazon的对头公司微软，指定Azure云处理内部业务。
有同学担心向美国移民局展示Amazon服务器会引发对方怒火，进而受到处罚。


所以后续改用美国Digital Ocean云服务器，避开大公司竞争的浑水。

举证信息
```text
Host digital-ocean-8c16g-atmBot
  HostName 157.203.124.61
  User root
  IdentityFile ~/ssh/root-do8c16g-0503.key
```