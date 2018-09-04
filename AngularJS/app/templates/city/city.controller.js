;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CityController', CityController);

    CityController.$inject = ['data', 'cities', '$mdSidenav', 'NgTableParams'];

    function CityController(data, cities, $mdSidenav, NgTableParams) {
        let vm = this;
        vm.stringArray = data.content.split('\n');
        vm.data = vm.stringArray.slice(8);
        vm.currentCity = data.title;
        vm.cities = cities;
        vm.parseJSON = parseJSON;
        vm.cityDescription = vm.stringArray[1] + ' \n' + vm.stringArray[2] + ' \n' + vm.stringArray[3] + ' \n' + vm.stringArray[4];
        vm.tableData = vm.parseJSON(vm.data);
        vm.tableParams = createTableParams();
        
        function createTableParams() {
            let initialParams = { count: 20 }; // initial page size
            let initialSettings = {
                counts: [],
                dataset: vm.tableData
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        function parseJSON(rows) {
            return rows.map(function (data) {
                var item = data.trim().split(/\s+/);
                return {
                    year: item[0],
                    month: item[1],
                    tmax: item[2],
                    tmin: item[3],
                    af: item[4],
                    rain: item[5],
                    sun: item[6]
                };
            });
        }
    }
})();