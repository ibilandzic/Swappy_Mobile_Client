angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.woman', {
    url: '/woman',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/woman.html',
        controller: 'womanCtrl'
      }
    }
  })

  .state('menu.girls', {
    url: '/girls',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/girls.html',
        controller: 'girlsCtrl'
      }
    }
  })

  .state('menu.favorites', {
      cache: false,
    url: '/favorites',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favorites.html',
        controller: 'favoritesCtrl'
      }
    }
  })

  .state('menu.myAds', {
    url: '/myads',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/myAds.html',
        controller: 'myAdsCtrl'
      }
    }
  })

  .state('menu.man', {
    url: '/man',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/man.html',
        controller: 'manCtrl'
      }
    }
  })

  .state('menu.boys', {
    url: '/boys',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/boys.html',
        controller: 'boysCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true,
      controller: 'loginCtrl'
  })
  
  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'loginCtrl'
      }
    }
  })


  .state('menu.newAd', {
    url: '/newad',
      cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/newAd.html',
        controller: 'newAdCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});