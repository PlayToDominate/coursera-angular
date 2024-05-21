(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as categoriesController',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('categories.items', {
    url: '/items/{short_name}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as itemsController',
    resolve: {
      menuOptions: ['$stateParams','MenuDataService',
      function ($stateParams,MenuDataService) {
        // console.log('items $stateParams: ',$stateParams);
        // console.log('return data: ', MenuDataService.getItemsForCategory($stateParams.short_name));
        return MenuDataService.getItemsForCategory($stateParams.short_name);
        // return MenuDataService.getItemsForCategory().then(function(menuOptions){
        //   console.log('items state: ',menuOptions[$stateParams.short_name]);
        //   return menuOptions[$stateParams.short_name];
        // });
      }]
    }
  });

}

})();
