https://zhufengnodejs.github.io/doc/html/node%E9%A1%B9%E7%9B%AE/%E7%8F%A0%E5%B3%B0%E8%81%8A%E5%A4%A9%E5%AE%A4.html

npm init -y

.bowerrc
{"directory":"./public/lib"}

bower init

bower install angular angular-route angular-moment bootstrap --save

npm install express socket.io cookie-parser express-session mongoose --save

创建项目

创建文件夹并且进入

mkdir 201607chat
cd 201607chat
初始化bower配置文件    sss

手工创建.bowerrc用来指定安装目录

{
  "directory":"./public/lib"
}
bower.json用来指定项目的前端依赖库 此文件通过以下命令生成

bower init
"dependencies": {
    "cookie-parser": "^1.4.3",
    "express": "^4.14.0",
    "express-session": "^1.14.1",
    "mongoose": "^4.6.3",
    "socket.io": "^1.5.0"
  }
在.gitignore中增加以下忽略

node_modules
lib
.idea