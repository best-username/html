;(function () {

    'use strict';

    angular.module('service.getWeather', [])
        .service('getWeather', getWeather);


    getWeather.$inject = ['$http', 'url'];

    function getWeather($http, url) {


        return {
            get: get
        };

        /**
         * Function for gettinf weather
         * @param {object} data
         * @param {string} data.q - '{city name},{country code}'
         * @returns {*}
         */
        function get(data) {
            return $http.get(url.getWeather, data).then(function (res) {
                    return res;
                });
        }
    }
})();