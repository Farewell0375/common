
# 自动化部署

## 自动化部署的原理
简单来说,就是写完代码提交到github后，jenkins检测到代码变化就会自动构建项目，把最新的代码拉取到服务器。

## 首先需要yum update更新一下
## 安装jdk
1. 查看是否已安装java 如果已安装可能需要卸载，更换到特定版本
2. 搜索java包, yum search java
3. 安装特定版本 yum install java-1.8.0-openjdk.x86_64
4. 可能需要java11的版本, yum list |grep java-11

## 安装jenkins
1. 下载依赖 wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
2. 导入密钥 rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
3. 安装 yum install jenkins

### 查看jenkins的安装信息
rpm -ql jenkins
1. /usr/lib/jenkins/：jenkins安装目录，war包会放在这里。
2.  /etc/sysconfig/jenkins：jenkins配置文件，“端口”，“JENKINS_HOME”等都可以在这里配置。
3. /var/lib/jenkins/：默认的JENKINS_HOME。
4. /var/log/jenkins/jenkins.log：jenkins日志文件。
### 修改jenkins的端口信息
1. 修改/etc/sysconfig/jenkins中的JENKINS_PORT
2. 修改vim /usr/lib/systemd/system/jenkins.service中的端口 保持一致

## 启动与关闭
1. 启动 systemctl start jenkins
1. 关闭 systemctl stop jenkins

### 首次启动可能会白屏，因为jenkins默认加载的网站被墙了，需要修改配置文件
1. jenkins目录中 /var/lib/jenkins 修改hudson.model.UpdateCenter.xml文件中的url为 http://mirror.xmission.com/jenkins/updates/update-center.json

## jenkins可以视为一个单独的服务器，项目运行的环境都可以在上面安装
1. 安装nodejs
2. 生成ssh密匙，为了链接git之类的
3. 切换到jenkins用户 sudo su -s /bin/bash jenkins
4. 无法切换 enkins在安装的/etc/passwd 文件中/bin/bash 变成了/bin/false ,修改为/bin/bash
5. 修改完passwd文件之后再运行sudo su jenkins 还会出现bash-4.2 而不是jenkins用户。
6. 原因是在用useradd添加普通用户时，有时会丢失家目录下的环境变量文件，丢失文件如下：
    .bash_profile
    .bashrc
    此时可以使用以下命令从主默认文件/etc/skel/下重新拷贝一份配置信息到此用户家目录下
7. 生成jenkins用户的密匙  ssh-keygen -t rsa -C "备注"
    cat /root/.ssh/id_rsa.pub #查看公钥（放github）  cat /root/.ssh/id_rsa #查看私钥
8. 新版jenkins添加了特殊的验证，可以在全局安全配置中关掉，否则无法连接git

## 正常情况下到这个位置已经可以拉去git代码了，下面进行构建的步骤
1. 直接在shell中运行npm命令大概会报错