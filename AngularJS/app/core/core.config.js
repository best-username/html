;(function () {
        'use strict';

        angular
            .module('app')
            .config(mainConfig);

        mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function mainConfig($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/city/');

            $stateProvider
                .state('city', {
                    url: '/city/:city',
                    templateUrl: 'templates/city/city.html',
                    controller: 'CityController',
                    controllerAs: 'vm',
                    resolve: {
                        data: getData,
                        cities: getCities
                    },
                    params : {
                        stationInfo : {
                            city: 'Aberporth',
                            state: 'open',
                            url: 'aberporthdata.txt'
                        }
                    }
                });
        }

        function getData($log, $q, $stateParams, cities, getData) {
            var stationInfo = $stateParams.stationInfo;
            return $q.all({
                title: stationInfo.city,
                state: stationInfo.state,
                content: getData.get(stationInfo.url)
            });
        }

        function getCities(getData) {
            return getData.get();
        }


    }

)();



