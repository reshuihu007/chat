angular.module('chatMod').controller('LoginCtrl',function($scope,$http,$rootScope,$location){
    $scope.login= function () {
        $http({
            url:'/user/login',
            method:'POST',
            data:{email:$scope.email}
        }).success(function (result) {
            //console.log(result)
            if(result.errno ==0){
                $rootScope.user = result.data;
                $location.path('rooms');
            }else {
                $rootScope.errorMsg = result.msg;
            }
        });
    }
});