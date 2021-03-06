var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./db').User;
var Room = require('./db').Room;

var app = express();

var server =require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req,res) {
    res.sendFile(path.resolve('app/index.html'));
});

//把public和app目录作为静态文件根目录；书写顺序在get文件下面
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
/*
    1. 获取请求体对象
*/
app.use(bodyParser.json());
app.post('/user/login', function (req,res) {
    /*var email = req.body.email;
    var user = {email};
    console.log(req.body,email,user);*/
    var uu = req.body;

    User.findOne(uu,function(err,doc){
        if(err){
            res.send({errno:1,errmsg:'查询出错',data:err});
        }else {
            if(doc){
                res.send({errno:0,errmsg:'成功',data:doc});
            }else{
                uu.avater = 'https://secure.gravatar.com/avatar/email';
                //保存此用户之后得到一个保存之后的文档_id;
                User.create(uu, function (err2,doc2) {
                    if(err2){
                        res.send({errno:1,errmsg:'增加房间出错',data:err2});
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

app.post('/rooms', function (req,res) {
    var room = req.body;
    room.users = room.message = [];
    Room.create(room, function (err,doc) {
        if(err){
            res.send({errno:1,errmsg:'保存出错',data:err});
        }else{
            res.send({errno:0,errmsg:'成功',data:doc});
        }
    });
});
app.get('/rooms/:id', function (req,res) {
    Room.findById(req.params.id, function (err,room) {
        if(err){
            res.send({errno:1,errmsg:'保存出错',data:err});
        }else{
            res.send({errno:0,errmsg:'成功',data:room});
        }
    });
});

io.on('connection', function (socket) {
    socket.on('message', function (msgObj) {
        msgObj.createAt = new Date();
        //console.log(msgObj,'server');
        io.emit('message',msgObj);
    });
});

//app.listen(8080, function () { console.log('port 8080'); });
server.listen(8080, function () { console.log('port 8080'); });