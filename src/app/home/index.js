import angular from 'angular';
import uirouter from 'angular-ui-router';
import HomeController from './home.controller';

const home = 'app.home';

angular.module(home, [uirouter])
  .controller('HomeController', HomeController);

HomeController.$inject = ['$state', '$http','$templateCache'];

export default home;
