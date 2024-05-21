(function () {
  'use strict';

  angular.module('MenuApp')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;
    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
      }).then(function(response){
        var items=[];
        for(var i in response.data) {
            items.push(response.data[i]);
        }
        // console.log('categories: ',items);
        return items;
      });
    };
    service.getItemsForCategory = function (short_name) {
      // console.log('getItemsForCategory: ',short_name);
      return $http({
        method: "GET",
        url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"+short_name+".json")
      }).then(function(response){
        var menuOptions=[];
        // console.log('response: ',response.data);
        for(var i in response.data) {
            menuOptions.push(response.data[i]);
        }
        // console.log('menu items: ',menuOptions);
        return menuOptions;
      });
    };
  }
})();
