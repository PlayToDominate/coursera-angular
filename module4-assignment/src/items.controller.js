(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService','menuOptions'];
function ItemsController(MenuDataService,menuOptions) {
  var itemsController = this;
  // console.log('CategoriesController ',items);
  itemsController.menuOptions = menuOptions[1];
  console.log('ItemsController menuOptions: ', menuOptions);
  console.log('ItemsController itemsController: ', itemsController);
}
})();
