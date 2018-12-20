import angular from 'angular';
import uirouter from 'angular-ui-router';
import config from './app.config';
import routing from './app.routes';
import home from './home';
import msg from './messages';
import settings from './settings';
import wishlist from './wishlist';
import account from './account';
import '../style/app.css';
import css from 'uikit/dist/css/uikit.css';
import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit/dist/js/uikit.js';

// loads the Icon plugin
UIkit.use(Icons);

/*
  Controlador principal
 */
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  /**
   * Dependency injection
   * @param  {[type]} $state
   * @param  {[type]} $http
   */
  constructor($state, $http) {
    /**
     * Describe los nombres de las rutas
     * @type {Object}
     */
    this.menus = {
      data: [{ route: 'home' },
        { route: 'messages' },
        { route: 'wishlist' },
        { route: 'settings' },
        { route: 'account' }
      ]
    }
    this.state = $state;
    this.http = $http;

  }
  /**
   * Redirecciona a la ruta que recibe
   * @param  {string}
   */
  goTo(route) {
    this.state.go(route.toString());
  }

}

const MODULE_NAME = 'app';
/**
 * Se definen los modulos que va a implementar
 */
angular.module(MODULE_NAME, [uirouter, home, msg, settings, wishlist, account])
  .config(config)
  .config(routing)
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

app.$inject = ['$state', '$http'];

export default MODULE_NAME;
