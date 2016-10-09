angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
    $scope.rooms=[];
    $http({
        url:'/rooms',
        method:'GET'
    }).success(function (result) {
        if(result.errno ==0){ //
            $scope.rooms = result.data;
        }else {
            $rootScope.errorMsg = result.msg;
        }
    })
});
