(function () {
    'use strict';
    var app = angular.module('eliteAdmin', [
        // Angular modules
        'ngRoute',

        // 3rd Party Modules
        'ui.bootstrap',
        'uiGmapgoogle-maps'
        
    ]);

    app.config(['$routeProvider', '$locationProvider','uiGmapGoogleMapApiProvider', configRoutes]);

    function configRoutes($routeProvider,$locationProvider,uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA3V5swocAk1bYznkHofnSKNPNJ7Y0Ga-I',
        v: '3.25', //defaults to latest 3.X anyhow
        //libraries: 'weather,geometry,visualization'
    });
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
             .when('/leagues', {
                templateUrl: 'app/leagues/leagues.html',
                controller: 'LeaguesCtrl',
                controllerAs: 'vm'
              
            }).when('/leagues/:id/teams', {
                templateUrl: 'app/teams/teams.html',
                controller: 'TeamsCtrl',
                controllerAs: 'vm'
            })
            .when('/leagues/:id/games', {
                templateUrl: 'app/games/games.html',
                controller: 'GamesCtrl',
                controllerAs: 'vm'
              
            })
            .when('/leagues/:id/league-home', {
                templateUrl: 'app/league-home/league-home.html',
                controller: 'LeagueHomeCtrl',
                controllerAs: 'vm'
                
            })
            .when('/locations',{
                templateUrl: 'app/locations/locations.html',
                controller: 'LocationsCtrl',
                controllerAs: 'vm'
            })
            .when('/location/:id?',{
             templateUrl: 'app/locations/edit-location.html',
                controller: 'EditLocationCtrl',
                controllerAs: 'vm',
                resolve: {
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }],
                    currentPosition: ['$q', function($q){
                        var deferred = $q.defer();
                        navigator.geolocation.getCurrentPosition(function(position){
                            deferred.resolve(position);
                        });
                        return deferred.promise;
                    }]
                }    
            });

         
        $routeProvider.otherwise('/');
    }

    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();
