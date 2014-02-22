
angular.module('lifeOfText.services')
    .factory('Adventure', function($http) {

        var self = {};

        self.getSilentiStory = function () {
            $http.get('data/theSilenti.json')
                .then(function(res){
                    console.log(res.data);
                });

        };

        return self;

    }
);