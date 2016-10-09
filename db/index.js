var mongoose = require('mongoose');
mongoose.Promise = Promise;
var config = require('../config');
mongoose.connect(config.dbUrl);

var UserSchema = new mongoose.Schema({
    email:String,
    avater:String
});
 //定义可以操作用户User集合的模型对象
var User = mongoose.model('User',UserSchema);
 //将此用户模型进行导出 require('db').User;
exports.User = User;

var RoomSchema = new mongoose.Schema({
    name:String
});
var Room = mongoose.model('Room',RoomSchema);
exports.Room = Room;

//Room.create([{'name':'Java'},{'name':'JavaScript'}]);