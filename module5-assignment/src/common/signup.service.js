(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  console.log('SignupController');
  var service = this;
  service.user = {};
  service.getUser = function(){
    // console.log('service user: ',service.user);
    return service.user;
  }
  service.setUser = function(user){
    console.log('service user: ',user);
    service.user = user;
  }
  service.getFavoriteDish = function(short_name) {
    var short_name_letter = short_name.substring(0,1);
    var short_name_num = short_name.substring(1,2);
    // console.log('short_name_num',short_name_num);
    short_name_num--;
    console.log('short_name_num',short_name_num);
    return $http.get(ApiPath + '/menu_items/' + short_name_letter + '/menu_items/'+short_name_num+'.json');
  }
}
})();
