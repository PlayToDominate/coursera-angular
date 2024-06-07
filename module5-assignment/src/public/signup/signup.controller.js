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
        var favoriteDishCategory = signupCtrl.user.favoriteDish.substring(0,1);
        signupCtrl.user.favoriteDishCategory = favoriteDishCategory;
        console.log('SignupController favoriteDishCategory: ',signupCtrl.user.favoriteDishCategory);
        SignupService.setUser(signupCtrl.user);
        signupCtrl.showMessage = true;
        signupCtrl.showError = false;
      }
    }, function(error) {
      console.log(error);
      signupCtrl.showError = true;
    });
  };
}
})();
