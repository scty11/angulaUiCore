(function() {
'use strict';

    angular
        .module('eliteAdmin')
        .controller('TeamsCtrl', TeamsCtrl);

    TeamsCtrl.$inject = ['$log','$uibModal', '$location', '$routeParams', 'eliteApi'];
    function TeamsCtrl($log,$uibModal,$location, $routeParams, eliteApi) {
        var vm = this;
        vm.teams = {};
        vm.go = go;
         vm.toggleExpand = toggleExpand;
         vm.accordionExpanded = true;
         vm.deleteItem = deleteItem;
        vm.editItem = editItem;

        activate();

        ////////////////

        function activate() { 
            eliteApi.getTeams($routeParams.id)
            .then(function(result){
                vm.teams = result;
                initializeGroups();
            })
            .catch(function(error){
                alert(error);
            });
        }

        function initializeGroups() {
            vm.groups = _.chain(vm.teams)
                .sortBy('name')
                .groupBy('divisionName')
                .toPairs()
                .map(function(item){
                    return { divisionName: item[0], teams: item[1], isOpen: true };
                })
                .sortBy('divisionName')
                .value();

                console.debug(vm.groups);
        }

        function toggleExpand(expand){
            _.forEach(vm.groups, function(group){
                group.isOpen = expand;
            });
        }

        function deleteItem(id) {
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteTeam(id).then(function(data){
                        _.remove(vm.teams, { 'id': id });
                        initializeGroups();
                    })
                    .catch(function(error){
                         alert(error);
                    });
                });
        }

        function editItem(team){
            var modalInstance = $uibModal.open({
                templateUrl: '/app/teams/edit-team.html',
                controller: 'EditTeamCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            divisions: _.chain(vm.teams).uniqBy('divisionName').map('divisionName').value(),
                            itemToEdit: team
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $routeParams.id;
                eliteApi.saveTeam(result).then(function(data){
                    if (team){
                        _.assign(team, data);
                    } else{
                        vm.teams.push(data);
                    }
                    initializeGroups();
                })
                .catch(function(){
                         alert(error);
                    });
            },function(){
                $log.info('Modal closed');
            });
        }

        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }
    }
})();