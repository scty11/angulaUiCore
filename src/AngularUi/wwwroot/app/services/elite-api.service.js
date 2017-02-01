(function () {
    'use strict';

    angular.module('eliteAdmin').factory('eliteApi', eliteApi);

    eliteApi.$inject = ['$http', 'appSpinner','$q'];

    function eliteApi($http, appSpinner,$q) {
        var service = {
            addLeague: addLeague,
            deleteGame: deleteGame,
            deleteLeague: deleteLeague,
            deleteLocation: deleteLocation,
            deleteTeam: deleteTeam,
            getGames: getGames,
            getLeague: getLeague,
            getLeagues: getLeagues,
            getLocation: getLocation,
            getLocations: getLocations,
            getTeams: getTeams,
            saveGame: saveGame,
            saveLeague: saveLeague,
            saveLocation: saveLocation,
            saveTeam: saveTeam
        };

         

        var baseUrl = "http://localhost:58422/";

        return service;
      
        function deleteTeam(id){
            appSpinner.showSpinner();
             return $http.delete( baseUrl + 'api/teams/' + id)
            .then(sendResponseData)
            .catch(GetError);
        }

         function saveTeam(team){

              appSpinner.showSpinner();
             return $http.post( baseUrl + 'api/teams', game)
            .then(sendResponseData)
            .catch(GetError);
        }


        function getTeams(leagueId) {

            appSpinner.showSpinner();
            return $http.get( baseUrl + 'api/teams/' +  leagueId)
            .then(sendResponseData)
            .catch(GetError);
        }

         function deleteGame(id){
            appSpinner.showSpinner();
             return $http.delete( baseUrl + 'api/games/' + id)
            .then(sendResponseData)
            .catch(GetError);
        }

        function saveGame(game){
             appSpinner.showSpinner();
             return $http.post( baseUrl + 'api/games', game)
            .then(sendResponseData)
            .catch(GetError);
        }

        function getGames(leagueId){
            appSpinner.showSpinner();
            return $http.get( baseUrl + 'api/games/' +  leagueId)
            .then(sendResponseData)
            .catch(GetError);
        }

        function deleteLeague(id){

            appSpinner.showSpinner();
             return $http.delete(baseUrl +'api/leagues/' + id)
            .then(sendResponseData)
            .catch(GetError);
            
        }

         function saveLeague(league)
         {
             appSpinner.showSpinner();
             return $http.post(baseUrl + 'api/leagues', league)
            .then(sendResponseData)
            .catch(GetError);
        }

        function addLeague(league){

            appSpinner.showSpinner();
            return $http.post(baseUrl + 'api/leagues', league)
            .then(sendResponseData)
            .catch(GetError);
        }

        function getLeague(id){

            appSpinner.showSpinner();
            return $http.get(baseUrl +'api/leagues/' + id)
            .then(sendResponseData)
            .catch(GetError);
        }

        function getLeagues() {

            appSpinner.showSpinner();
            return $http.get(baseUrl + 'api/leagues')
            .then(sendResponseData)
            .catch(GetError);
        }

         function getLocations() {
             appSpinner.showSpinner();
            return $http.get( baseUrl + 'api/locations')
            .then(sendResponseData)
            .catch(GetError);
        }

        function getLocation(id) {
             appSpinner.showSpinner();
            return $http.get( baseUrl + 'api/locations/' + id)
            .then(sendResponseData)
            .catch(GetError);
        }

        function saveLocation(location){
            appSpinner.showSpinner();
             return $http.post( baseUrl + 'api/locations', location)
            .then(sendResponseData)
            .catch(GetError);
            
        }

        function deleteLocation(id){
            appSpinner.showSpinner();
             return $http.delete( baseUrl + 'api/locations/' + id)
            .then(sendResponseData)
            .catch(GetError);
        }

        function sendResponseData(response) 
        {

            appSpinner.hideSpinner();
            return response.data;

        }

         function GetError(response) 
         {

            appSpinner.hideSpinner();
            return $q.reject('Error. (HTTP status: ' + response.status + response.statusText +')');

         }
    }
})();
