angular.module('chatMod').controller('RoomCtrl',function($scope,$http,$routeParams,$rootScope){
    var roomId = $routeParams.id;
    $http({
        url:`/rooms/${roomId}`,
        method:'GET'
    }).success(function (result) {
        if(result.errno ==0){
            $scope.room = result.data;
        }else {
            $rootScope.errorMsg= result.msg;
        }
    });

    var socket = io.connect('ws://localhost:8080');
    socket.on('message', function (msgObj) {
        $scope.room.messages.push(msgObj);
    });

    $scope.send = function () {
        var content = $scope.content;
        socket.send({user:$rootScope.user,content:$scope.content});
    }

});


angular.module('chatMod').directive('keyDown', function () {
   return{
       link: function (scope,element,attrs) {
           element.on('keydown', function (event) {

           });
           //element.keydown(function () { });
       }
   }
});