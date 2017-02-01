(function () {
    'use strict';

    angular.module('eliteAdmin').controller('EditLocationCtrl', EditLocationCtrl);

    EditLocationCtrl.$inject = ['$timeout', 'maps', 'currentPosition', 'eliteApi','$location', '$routeParams'];

    /* @ngInject */
    function EditLocationCtrl($timeout, maps, currentPosition, eliteApi,$location, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.refreshMap = refreshMap;
        vm.save = save;
        vm.title = ($routeParams.id ? 'Edit Location': 'Add Location');

        vm.map = {
            center: {
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude
            },
            zoom: 12
        };

        vm.marker = {
            id: 1,
            coords: currentPosition.coords
        };

        activate();

        ////////////////

        function activate() {
           
            if($routeParams.id)
            {
                eliteApi.getLocation($routeParams.id)
            .then(function(data){
                 vm.location = data;
                 if (vm.location.address){
                refreshMap();
            }
            })
            .catch(function(error){
                 $log.error(error);
            });
            }
        }

        function refreshMap(){
            var geocoder = new maps.Geocoder();
            geocoder.geocode({ address: vm.location.address }, function(result){
                if (result.length > 0) {
                    var addrLocation = result[0].geometry.location;

                    $timeout(function(){
                        vm.map.center = {
                            latitude: addrLocation.lat(),
                            longitude: addrLocation.lng()
                        };

                        vm.marker = {
                            id: 1,
                            coords: {
                                latitude: vm.map.center.latitude,
                                longitude: vm.map.center.longitude
                            },
                            options: {
                                title: vm.location.name
                            }
                        };
                    }, 0);
                }
            });
        }


        function save(){
            eliteApi.saveLocation(vm.location).then(function(){
                 $location.path('locations');
            })
             .catch(function(error){
                 $log.error(error);
            });
        }
    }
})();