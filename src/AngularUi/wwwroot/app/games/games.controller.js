(function() {
'use strict';

    angular
        .module('eliteAdmin')
        .controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['gamesInitialDataService','$log','$location', '$routeParams', 'eliteApi',
    'dialogsService','$uibModal'];
    function GamesCtrl(gamesInitialDataService,$log, $location, $routeParams, eliteApi,dialogsService,$uibModal) {
        var vm = this;
        vm.go = go;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.games = [];
        vm.locations = [];
        vm.locationsLookup = [];
        vm.teams = [];
        vm.teamsLookup = [];

        activate();

        ////////////////

        function activate() { 
            gamesInitialDataService.getData($routeParams.id)
            .then(function(result){
                vm.teams = result.teams;
                vm.games = result.games;
                vm.locations = result.locations;
                setLookups();
            })
            .catch(function(error){
                alert(error);
            });
        }

           function deleteItem(id){
            dialogsService.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteGame(id).then(function(data){
                        _.remove(vm.games, { 'id': id });
                    });
                },function(){
                    $log.info('Modal closed');
                });
                
        }

        function editItem(game){
            var modalInstance = $uibModal.open({
                templateUrl: '/app/games/edit-game.html',
                controller: 'EditGameCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            locations: _.sortBy(vm.locations, 'name'),
                            teams: _.sortBy(vm.teams, 'divisionName, name'),
                            itemToEdit: game
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $routeParams.id;
                eliteApi.saveGame(result).then(function(data){
                    if (game){
                        _.assign(game, data);
                      
                    } else{
                        vm.games.push(data);
                    }
                });
            },function(){
                    $log.info('Modal closed');
                });
        }

             function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }

        function setLookups(){

            _.forEach(vm.teams, function(team){
                vm.teamsLookup[team.id] = team.name;
            });

            _.forEach(vm.locations, function(location){
                vm.locationsLookup[location.id] = location.name;
            });
        }
    }

    
})();