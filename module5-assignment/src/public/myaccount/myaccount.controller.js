(function () {
    'use strict';

angular.module('public')
.controller('MyAccountController', MyAccountController);

MyAccountController.$inject = ['$scope','SignupService', 'ApiPath'];
function MyAccountController($scope,SignupService,ApiPath) {
      var myAccount = this;
      myAccount.apiPath = ApiPath;
      myAccount.signedUp = false;
      myAccount.user = SignupService.getUser();
      if (Object.keys(myAccount.user).length){
          myAccount.signedUp = true;
      } else {
          myAccount.signedUp = false;
      }
  };
})();
