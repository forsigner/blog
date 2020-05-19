---
title: 基于 Docker 的 Gitlab 和 Gitlab CI 搭建
date: 2020-05-19
tags: [Gitlab]
categories: 前端
---

## 缘起

回到金山西山居后，真的有点怀念大厂的基础建设了，统一的 Gitlab，统一的 CI，统一部署运维平台，这些西山居都没有，或者有，不好用，为什么不好用呢？因为一些权限、vpn、内外网限制等乱七八糟的原因。最终选择了自己团队搭建整个环境，主要包括：

- Docker 安装
- Gitlab 搭建
- Gitlab Runner 搭建
- 易于 Gitlab CI 的自动化部署

期间踩了一些坑，在此记录一下。

## Docker 安装

Gitlab 最快捷的搭建方式是使用 Docker，所以先安装 Docker。

我们用的金山云服务器，Centos 7 系统，安装 Dokcer 可以参考官方文档：[Install Docker Engine on CentOS](https://docs.docker.com/engine/install/centos/)。

依次执行一下命令即可：

**1.设置 REPOSITORY**

```bash
$ sudo yum install -y yum-utils

$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

**2.安装 Docker**

```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

**3.启动 Docker.**

```bash
$ sudo systemctl start docker
```

**4.验证 Docker 是否安装成功 **

```bash
$ sudo docker run hello-world
```

**注意**：
Centos7 安装 docker 之后，默认的镜像及容器存储路径为/var/lib/docker，可以使用命令 docker info 查看。但是该路径默认使用的是系统盘的存储，如果挂载了数据盘，需要把 docker 的默认存储路径修改至数据盘的挂载目录，则需要修改 docker 的相关配置。

将--graph /data/docker 添加在 docker.service 文件中的 ExecStart 字段后面，其中/data/docker 为你需要修改的存储目录。

```bash
$ mkdir -p /data/docker
$ vim /usr/lib/systemd/system/docker.service
```

找到 ExecStart 那行，更改内容：

```bash
## 原始内容:
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

## 改为:
ExecStart=/usr/bin/dockerd --graph /data/docker -H fd:// --containerd=/run/containerd/containerd.sock
```

然后重启 Docker 即可：

```bash
$ systemctl daemon-reload
$ systemctl restart docker
```

## 搭建 Gitlab

### 先获取 Gitlab 镜像

官方文档：https://hub.docker.com/r/gitlab/gitlab-ce/。

```bash
docker pull gitlab/gitlab-ce
```

### 使用 Docker 启动 Gitlab 服务

```bash
docker run --detach \
  --hostname <hostname> \
  --publish 8443:443 --publish 8880:80 --publish 8222:22 \
  --name gitlab \
  --restart always \
  --volume /data/gitlab/config:/etc/gitlab \
  --volume /data/gitlab/logs:/var/log/gitlab \
  --volume /data/gitlab/data:/var/opt/gitlab \
  --privileged=true \
  gitlab/gitlab-ce:latest
```

上面的 `<hostname>` 根据不同情况，可以是 ip，也可以是域名。根据自己的实际情况，配置适合自己的端口映射和 volume 映射。

详情看官方文档：https://docs.gitlab.com/omnibus/docker/ 。

启动后，就可以在浏览器访问 Gitlab，例如你的 hostname 为 11.14.45.67，访问 http://11.14.45.67 既可以访问 Gitlab。

### Gitlab 常用命令

```bash
# 进入 bash
sudo docker exec -it gitlab /bin/bash

# 编辑配置
sudo docker exec -it gitlab vi /etc/gitlab/gitlab.rb

# 或则先进入 bash， 然后再修改配置
sudo /etc/gitlab/gitlab.rb

# 修改后重载配置
gitlab-ctl reconfigure

# 重启
sudo docker restart gitlab

#停止
sudo docker stop gitlab
```

## 搭建 Gitlab Runner

同样，为了少折腾，选择 使用 Docker 搭建 Gitlab。

### 先获取 Gitlab 镜像

官方文档：https://hub.docker.com/r/gitlab/gitlab-runner/。

```bash
docker pull gitlab/gitlab-runner
```

### 用 Docker 启动 Gitlab Runner 服务

```bash
docker run -d --name gitlab-runner --restart always \
  -v /data/gitlab-runner/config:/etc/gitlab-runner \
  -v /data/var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

根据实际情况配置 volume 的映射，详情看官方文档：https://docs.gitlab.com/runner/install/docker.html#docker-image-installation 。

### 注册一个 Runner

官方文档：https://docs.gitlab.com/runner/register/#docker。

注册命令如下：

```bash
docker run --rm -t -i -v /data/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
```

根据实际情况配置 volume 的映射, 然后输入相应的 url、token、tags、description、executor 即可。

executor 根据时间需要选择，我选择 shell。

### Gitlab Runner 常用命令

```bash
# 进入 bash
docker exec -it gitlab-runner bash

# 修改配置 (要先进入bash)
vim /etc/gitlab-runner/config.toml

# 进入 Runner 用户 (要先进入bash)
# 注意：ci 脚本在这个用户里执行，不是在 bash 进来那个用户
su - gitlab-runner

# 重启
docker restart gitlab-runner

# 停止
docker stop gitlab-runner
```

## CI 自动化部署

我们的后端服务是 Node.js，下面是我们的 CI 脚本 `.gitlab-ci.yml`:

```yml
stages:
  - deploy_develop
  - deploy_release

cache:
  key: ${CI_BUILD_REF_NAME}
  paths:
    - node_modules/

deploy_develop:
  stage: deploy_develop
  only:
    - test
  tags:
    - larp-server
  script:
    - sh deploy/develop.sh

deploy_production:
  stage: deploy_production
  tags:
    - larp-server
  only:
    - master
  script:
    - sh deploy/production.sh
```

CI 脚本语法: https://docs.gitlab.com/ee/ci/yaml/README.html

不建议在 `.gitlab-ci.yml` 写复杂的脚本，复杂脚本建议写成 shell 脚本，例如 develop.sh:

```bash
#!/bin/bash

# 部署到多台服务器
HOSTS=("120.92.180.1 120.92.180.2 120.92.180.3 120.92.180.4")

# 发布目录
PUBLISH_DIR=/data/builds/server-project

# 压缩，并忽略 node_modules
zip -r dist.zip ./* -x "node_modules/*" "dist/*"


# 部署到每台服务器
publish(){
   ssh larp@$1 "mkdir -p ${PUBLISH_DIR}"
   scp dist.zip larp@$1:/${PUBLISH_DIR}
   ssh larp@$1 "cd ${PUBLISH_DIR};unzip -o dist.zip"
   ssh larp@$1 "cd ${PUBLISH_DIR};npm i"
   ssh larp@$1 "cd ${PUBLISH_DIR};npm run build"
   ssh larp@$1 "cd ${PUBLISH_DIR};npm run stop:test;npm run start:test"
}

for host in ${HOSTS[@]}
do
   publish $host
done
```

可以看到，上面的 ssh 是没有提供密码的，实际上 ssh 登录需要密码，但是我们不能在代码中暴露服务器的密码，那要怎么做呢？把 Gitlab Runner 的 id_rsa.pub 内容复制到目标服务器的 authorized_keys 即可。

实际操作过程如下：

```bash
# 先进入 bash
docker exec -it gitlab-runner bash

# 然后进入 gitlab-runner
su - gitlab-runner

# 把 id_rsa.pub 文件容复制到目标服务器的authorized_keys
# 默认是没有 ssh key 的， 需要自己 `ssh-keygen` 生产
cat ~/.ssh/id_rsa.pub
```

注意，CI 的 ssh key 在 gitlab-runner 用户下，不是 `docker exec -it gitlab-runner bash` 进去那个，而是进入 bash 后，再 `su - gitlab-runner` 进去，在这里面生产 ssh key。
