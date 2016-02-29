---
title: MongoDB Shell Command
date: 2015-07-01 22:10:10
tags: [MongoDB]
categories: 后端
toc: true
---


## 登录数据库

``` bash
$ mongod <hostname|ip> # 登录MongoDB

```

## 创建数据库

``` bash

$ use <dbname> # 切换到某个数据库 | 创建数据库
$ db # 查看当前数据库
$ show dbs # 查看服务器上的数据库

# 该操作会在test2数据库中新建一个hellocollection，并在其中插入一条记录
$ db.hello.insert({"name":"testdb"})
```

## 删除数据库

``` bash
$ db.dropDatabase() # 删除数据库

```

## 创建collection

``` bash
$ db.createCollection(name, options)
$ db.createCollection("Hello", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } )
$ db.Hello.insert({"hello" : "world"}) 插入数据自动创建collection
show collections # 查看当前数据库中的所有collection
$ db.Hello.renameCollection("hi") # 重命名collection

```


## 删除collection

``` bash
$ db.<collection_name>.drop() # 删除collection

```

## 插入document

``` bash
$ db.<collection_name>.insert(<document>)

```

## 查询document

``` bash
$ db.<collection_name>.find() # 查询有document
$ db.<collection_name>.find().pretty() # 格式化显示

```



## 更新document

``` bash
$ db.<collection_name>.update(SELECTIOIN_CRITERIA, UPDATED_DATA)
$ db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})

# MongoDB默认将只更新单一的文件，来更新多个你需要设置参数置'multi' 为true
$ db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}},{multi:true})

# save() 方法替换现有的document
$ db.<collection_name>.save({_id:ObjectId(),NEW_DATA})
```


## 删除document

``` bash
$ db.<collection_name>.remove(DELLETION_CRITTERIA)
```
