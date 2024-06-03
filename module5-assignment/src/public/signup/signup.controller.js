(function () {

angular.module('public')
.controller('SignupController', SignupController);
// .service('SignupService',SignupService); //signupservice is in common, so can't call it here

SignupController.$inject = ['$scope','SignupService'];
function SignupController($scope,SignupService) {
  var signupCtrl = this;
  signupCtrl.showMessage=false;
  signupCtrl.user = {};
  signupCtrl.submit = function () {
    SignupService.getFavoriteDish(signupCtrl.user.favoriteDish).then(function(response) {
      console.log('response: ',response);
      if(response.data == null) {
        signupCtrl.showMessage = false;
        signupCtrl.showError = true;
      } else {
        signupCtrl.user.favoriteDishDetails = response.data;
        console.log('SignupController favoriteDish: ',signupCtrl.user.favoriteDish);
        SignupService.setUser(signupCtrl.user);
        signupCtrl.showMessage = true;
      }
    }, function(error) {
      console.log(error);
      signupCtrl.showError = true;
    });
  };
}
})();
