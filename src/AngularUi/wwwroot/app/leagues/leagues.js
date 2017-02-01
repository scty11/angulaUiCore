(function() {
'use strict';

    angular
        .module('eliteAdmin')
        .controller('LeaguesCtrl', LeaguesCtrl);

    LeaguesCtrl.inject = ['eliteApi','$log','dialogsService'];
    function LeaguesCtrl(eliteApi, $log,dialogsService) {
        var vm = this;
       
        vm.addItem = addItem;
        vm.cancelEdit = cancelEdit;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.hideAlert = hideAlert;      
        vm.saveItem = saveItem;
        vm.hideAlert = hideAlert;
        vm.showHelpAlert = true;
        vm.leagues = {};
        vm.itemToEdit = {};
        vm.currentEdit = {};

        activate();

        ////////////////

        function activate() 
        { 
            eliteApi.getLeagues()
            .then(function(data){
                vm.leagues = data;
            })
            .catch(function(error){
                 $log.error(error);
            });

        }

        function addItem(){
            var newLeague = {
                name: vm.newLeagueName
            };

            eliteApi.addLeague(newLeague).then(function(data){
                vm.newLeagueName = '';
                vm.leagues.push(data);
            })
            .catch(function(error){
                 $log.error(error);
            });
        }

        function cancelEdit(id){
            vm.currentEdit[id] = false;
        }

        function deleteItem(id){

            dialogsService.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteLeague(id).then(function(data){
                        _.remove(vm.leagues, { 'id': id });
                    })
                    .catch(function(error){
                 $log.error(error);
                    });
                },function(){
                    $log.info('Modal closed');
                });
        }

        function editItem(item){
            vm.currentEdit[item.id] = true;
            vm.itemToEdit = angular.copy(item);
        }

        function hideAlert(){
            vm.showHelpAlert = false;
        }

        function saveItem(item){
            eliteApi.saveLeague(vm.itemToEdit).then(function(data){
                vm.currentEdit[item.id] = false;
                item.name = vm.itemToEdit.name;
            })
            .catch(function(error){
                 $log.error(error);
            });
        }

    }
})();