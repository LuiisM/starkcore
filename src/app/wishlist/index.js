import angular from 'angular';
import uirouter from 'angular-ui-router';

import WishlistController from './wishlist.controller';

const wishlist = 'app.wishlist';

angular.module(wishlist, [uirouter])
  .controller('WishlistController', WishlistController);

export default wishlist;