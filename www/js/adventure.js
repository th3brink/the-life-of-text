
angular.module('lifeOfText.services')
    .factory('Adventure', function($http) {

        var self = {
            silenti: {}
        };

        self.getSilentiStory = function () {
            $http.get('data/theSilenti.json')
                .then(function(res){
                    self.silenti = res.data;
                });

        };
        self.getSilentiStory();

        self.getInventory = function () {
            return self.silenti.players.self.inventory;
        };
        self.inventoryAdd = function (addMe) {
            self.silenti.players.self.inventory.push(addMe);
        };
        self.inventoryRemove = function (addMe) {
            for (var i = 0; i < self.silenti.players.self.inventory.length; i++) {
                if (self.silenti.players.self.inventory[i]) {
                    self.silenti.players.self.inventory.splice(i, 1);
                }
            }
        };

        return self;

    }
);