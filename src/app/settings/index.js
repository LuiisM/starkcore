import angular from 'angular';
import uirouter from 'angular-ui-router';

import SettingsController from './settings.controller';

const settings = 'app.settings';

angular.module(settings, [uirouter])
  .controller('SettingsController', SettingsController);

export default settings;