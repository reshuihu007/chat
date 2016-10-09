angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
    $scope.rooms = $scope._rooms = [];
    $http({
        url:'/rooms',
        method:'GET'
    }).success(function (result) {
        if(result.errno ==0){ //
            $scope.rooms = $scope._rooms = result.data;
        }else {
            $rootScope.errorMsg = result.msg;
        }
    });
    $scope.filter= function () {
        var keyword = $scope.keyword;
        $scope.rooms = $scope._rooms.filter(function (item) {
            return item.name.indexOf(keyword)!=-1;
        });
    };

    //创建房间
    $scope.createRoom =function(){
        var keyword = $scope.keyword;
        $http({
            url:'/rooms',
            method:'POST',
            data:{name:keyword}
        }).success(function (result) {
            if(result.errno == 0){
                //保存成功之后的对象保存到数组对象之中。
                $scope._rooms.push(result.data);
                //重新过滤下个给rooms重新赋值，
                $scope.filter();
            }else{
                $rootScope.errorMsg = result.msg;
            }
        });
    }
    //进入房间聊天室
    $scope.roomIn= function (_id) {
        $http({
            url:'/room',
            method:'POST',

        }).success(function (result) {
            if(result.errno == 0){
                //保存成功之后的对象保存到数组对象之中。
                $scope._rooms.push(result.data);
                //重新过滤下个给rooms重新赋值，
                $scope.filter();
            }else{
                $rootScope.errorMsg = result.msg;
            }
        });
    }
});
