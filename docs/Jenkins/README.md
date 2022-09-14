# 自动化部署

## 自动化部署的原理
简单来说,就是写完代码提交到github后，jenkins检测到代码变化就会自动构建项目，把最新的代码拉取到服务器。

## 安装jdk1.8
1. 搜索java包, yum search java
2. 安装特定版本 yum install java-1.8.0-openjdk.x86_64