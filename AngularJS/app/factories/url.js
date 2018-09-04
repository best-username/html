;(function () {
    'use strict';
    angular
        .module('factory.url', [])
        .factory('url', url);


    url.$inject = [];

    function url() {
        var FilePath = {};
        FilePath.getLink = getLink;
        function getLink(city) {
            var url = 'https://cors.io/?https://www.metoffice.gov.uk/pub/data/weather/uk/climate/';
            if(city) return url + 'stationdata/' + city; // return url to description of city
            else return url + 'historic/historic.json'; // return url to list of all cities
        }
        return FilePath;
    }

})();