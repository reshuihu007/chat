angular.module('chatMod',['ngRoute']).config(function ($routeProvider) {
   $routeProvider.when('/',{
       templateUrl:'/pages/login.html',
       controller:'LoginCtrl'
   }).when('/rooms',{
       templateUrl:'/pages/rooms.html',
       controller:'RoomsCtrl'
   }).when('/rooms/:id',{
       templateUrl:'/pages/room.html',
       controller:'RoomCtrl'
   }).otherwise({
       redirectTo:'/'
   })
});

