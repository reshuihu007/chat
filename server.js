var express = require('express');
var path = require('path');
var app = express();


app.get('/', function (req,res) {
    res.sendFile(path.resolve('app/index.html'));
});

//把public和app目录作为静态文件根目录；书写顺序在get文件下面
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));

app.listen(8080, function () {
    console.log('port 8080');
})