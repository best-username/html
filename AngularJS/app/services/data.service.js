;(function () {

    'use strict';

    angular.module('service.getData', [])
        .service('getData', getData);

    getData.$inject = ['$http', 'url'];

    function getData($http, url) {

        return {
            get: get
        };

        /**
         * Function for getting cities list with description
         * @returns {*}
         */
        function get(cityName) {
            return $http.get(url.getLink(cityName)).then(function (result) {
                    return result.data;
                });
        }
    }
})();