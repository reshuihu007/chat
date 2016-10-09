var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./db').User;
var Room = require('./db').Room;

var app = express();


app.get('/', function (req,res) {
    res.sendFile(path.resolve('app/index.html'));
});

//把public和app目录作为静态文件根目录；书写顺序在get文件下面
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
/*
    1. 获取请求体对象
*/
app.use(bodyParser.json())
app.post('/user/login', function (req,res) {
    var email = req.body.email;
    var user = {email}
    User.findOne({email},function(err,doc){
        if(err){
            res.send({errno:1,errmsg:'查询出错',data:err});
        }else {
            if(doc){
                res.send({errno:0,errmsg:'成功',data:doc});
            }else{
                user.avater = 'https://secure.gravatar.com/avatar/email';
                //保存此用户之后得到一个保存之后的文档_id;
                User.create(user, function (err2,doc2) {
                    if(err2){
                        res.send({errno:1,errmsg:'保存出错',data:err2});
                    }else{
                        res.send({errno:0,errmsg:'成功',data:doc2});
                    }
                });
            }
        }
    });
})

app.get('/rooms', function (req,res) {
    Room.find({}, function (err,rooms) {
        if(err){
            res.send({errno:1,errmsg:'查询出错',data:err});
        }else{
            res.send({errno:0,errmsg:'成功',data:rooms});
        }
    })
});
app.listen(8080, function () {
    console.log('port 8080');
});