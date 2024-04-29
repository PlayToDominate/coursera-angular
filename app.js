(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var shoppingList = this;
  shoppingList.items = ShoppingListCheckOffService.getShoppingList();
  shoppingList.buyItemFromList = function (itemIndex) {
    try {
      ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (error) {
      shoppingList.errorMessage = error.message;
    }
  };
}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var completedList = this;
  completedList.items = ShoppingListCheckOffService.getPurchasedList();
}

function ShoppingListCheckOffService() {
  var service = this;
  var buyItems = [
    {name:"Gallons of Milk",quantity:2},
    {name:"Donuts",quantity:3},
    {name:"Cookies",quantity:13},
    {name:"Veggie",quantity:1},
    {name:"Fruit",quantity:1},
    {name:"Charcoal",quantity:1},
    {name:"Buns",quantity:12},
    {name:"Brats",quantity:12}
  ];
  var boughtItems=[];

  service.buyItem = function (itemIndex) {
    // var item = {
    //   name: buyItems[itemIndex].name,
    //   quantity: buyItems[itemIndex].quantity
    // };
    var item = buyItems(itemIndex);
    boughtItems.push(item);
    buyItems.splice(itemIndex, 1);
  };

  service.getShoppingList = function () {
    return buyItems;
  };
  service.getPurchasedList = function () {
    return boughtItems;
  }
}
})();
