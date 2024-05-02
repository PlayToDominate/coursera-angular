(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath','https://coursera-jhu-default-rtdb.firebaseio.com');


  function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'menuSelections.html',
        restrict: 'E',
        scope: {
          menu: '=foundItems',
          onRemove: '&'
        },
      };
      return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu=this;
    menu.logMenuItems = function (description) {
      var promise = MenuSearchService.getMatchedMenuItems(description);
      promise.then(function (response) {
        console.log('response',response);
        menu.foundItems = response;
      })
      .catch(function (error) {
        console.log("Nothing Found");
      });
    };
    menu.removeMenuItem = function (itemIndex) {
      menu.foundItems.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (description) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          description: description
        }
      }).then(function(response){
        var foundItems=[];
        for (const menuItems in response.data) {
          var name = response.data[''+menuItems+'']['menu_items'];
          for (var i=0; i < name.length; i++){
            var menuDesc = response.data[''+menuItems+'']['menu_items'][i].description;
            var menuShortName = response.data[''+menuItems+'']['menu_items'][i].short_name;
            var menuName = response.data[''+menuItems+'']['menu_items'][i].name;
            var menuObj = {};
            if(menuDesc.indexOf(description) > -1){
              menuObj = { name: menuName, short_name: menuShortName, description: menuDesc };
              foundItems.push(menuObj);
            }
          }
        }
        return foundItems;
      });
    };
  }
})();
