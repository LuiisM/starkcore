import angular from 'angular';
import uirouter from 'angular-ui-router';

import MessagesController from './messages.controller';

const msg = 'app.msg';

angular.module(msg, [uirouter])
  .controller('MessagesController', MessagesController);

export default msg;