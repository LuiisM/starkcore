routes.$inject = ['$stateProvider','$urlRouterProvider'];

export default function routes($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home/home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    }).state('messages', {
      url: '/messages',
      template: require('./messages/messages.html'),
      controller: 'MessagesController',
      controllerAs: 'msg'
    }).state('wishlist', {
      url: '/wishlist',
      template: require('./wishlist/wishlist.html'),
      controller: 'WishlistController',
      controllerAs: 'wish'
    }).state('settings', {
      url: '/settings',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'setting'
    }).state('account', {
      url: '/account',
      template: require('./account/account.html'),
      controller: 'AccountController',
      controllerAs: 'acc'
    });
    $urlRouterProvider.otherwise('/');
}