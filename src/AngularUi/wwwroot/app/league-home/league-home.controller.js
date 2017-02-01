(function() {
'use strict';

    angular
        .module('eliteAdmin')
        .controller('LeagueHomeCtrl', LeagueHomeCtrl);

    LeagueHomeCtrl.$inject = ['$location', 'eliteApi','$routeParams'];
    function LeagueHomeCtrl($location,eliteApi,$routeParams) {
        var vm = this;
        vm.initialData = {};
        vm.go = go;

        activate();

        ////////////////

        function activate() { 

            eliteApi.getLeague($routeParams.id)
            .then(function(result){
                vm.initialData = result;
            })
            .catch(function(error){
                alert(error);
            });
        }

        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }
    }
})();