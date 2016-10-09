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

    //var socket = io.connect(`ws://${window.location.hostname}`);
    var socket = io.connect(`ws://localhost:8080/`);
    //var socket = io.connect(`/`);
    socket.on('message', function (msgObj) {
        //console.log(msgObj,$scope.room.messages,'onmessage');
        $scope.room.messages.push(msgObj)
        $scope.apply();
    });

    $scope.send = function () {
        //console.log('send');
        socket.send({user:$rootScope.user,content:$scope.content});
    }
});

angular.module('chatMod').directive('keyDown', function () {
   return{
       link: function (scope,element,attrs) {
           element.keydown(function(event){
               if(event.keyCode == 13){
                   scope.$eval(attrs.keyDown);
               }
           });
       }
   }
});