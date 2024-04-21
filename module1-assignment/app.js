(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
   $scope.checkIfTooMuch = function () {
     var numItems = 0;
     if($scope.lunchMenu){
       numItems=$scope.lunchMenu.split(',').length;
     }
    if(numItems == 0){
      $scope.messageReturn = "Please enter data first";
    } else if(numItems > 3){
       $scope.messageReturn = "Too Much!";
     } else {
       $scope.messageReturn = "Enjoy!";
     }
   }
}

})();
