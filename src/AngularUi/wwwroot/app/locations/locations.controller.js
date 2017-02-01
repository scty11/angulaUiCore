(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LocationsCtrl', LocationsCtrl);

    LocationsCtrl.$inject = ['$log', 'dialogsService', 'eliteApi'];

    /* @ngInject */
    function LocationsCtrl($log, dialogs, eliteApi) {
        /* jshint validthis: true */
        var vm = this;

        vm.deleteItem = deleteItem;
        vm.locations = [];

        activate();

        ////////////////

        function activate() 
        {
             eliteApi.getLocations()
            .then(function(data){
                 vm.locations = data;
            })
            .catch(function(error){
                 $log.error(error);
            });

        }

        function deleteItem(id) {
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteLocation(id).then(function(data){
                        _.remove(vm.locations, { 'id': id });
                    })
                    .catch(function(error){
                        $log.error(error);
                   });
                },function(){
                    $log.info('Modal closed');
                });
        }
    }
})();