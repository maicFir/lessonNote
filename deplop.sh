# 如果项目已经初始化后，已经init 那么不用
# git init
# 更新master
git pull origin master
# 查看本地状态
git status
# 添加本地修改的文件
git add .

# 读取终端输入的信息
read -p "input commit message: " msg
# 提交
git commit -m "$msg"
# 添加远程remote 如果项目已经remote，可以省略
# git remote add origin https://github.com/maicFir/lessonNote.git
# 推送到指定分支
git push origin master


