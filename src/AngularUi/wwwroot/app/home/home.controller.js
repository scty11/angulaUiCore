(function () {
    'use strict';

    angular.module('eliteAdmin').controller('HomeCtrl', ['eliteApi',HomeCtrl]);
    HomeCtrl.$inject = ['eliteApi'];
    /* @ngInject */
    function HomeCtrl(eliteApi) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.notesCollapsed = true;

        activate();

        ////////////////

        function activate() {

            eliteApi.getLeagues()
            .then(function(result){
                vm.leagues = JSON.stringify(result);
            })
            .catch(function(error){
                alert(error);
            });
        }


    }
})();