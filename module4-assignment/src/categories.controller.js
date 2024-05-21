(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['MenuDataService','items'];
function CategoriesController(MenuDataService,items) {
  var categoriesController = this;
  // console.log('CategoriesController ',items);
  categoriesController.items = items;
  // console.log('mainList: ',items);
}

})();
