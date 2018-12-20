import angular from 'angular';
import uirouter from 'angular-ui-router';

import AccountController from './account.controller';

const account = 'app.account';

angular.module(account, [uirouter])
  .controller('AccountController', AccountController);

export default account;