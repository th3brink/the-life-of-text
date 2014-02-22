angular.module('lifeOfText.services')
    .factory('Adventure', function($http) {

        var self = {
            silenti: {}
        };

        self.getSilentiStory = function(cb) {
            $http.get('data/theSilenti.json')
                .then(function(res){
                    self.silenti = res.data;
                    if (cb) cb();
                }
            );
        };

        self.getStoryDescription = function() {
            return self.silenti.adventure.name;
        };

        self.move = function(direction) {
            var currentLoc = getCurrentLocation();
            var newLocation = currentLoc.location[direction];
            if (currentLoc.location[direction] !== null && allowedMove(currentLoc.location[direction]) === true) {
                currentLoc.location.visited = true;
                setCurrentLocation(newLocation);
                currentLoc = getCurrentLocation();
                return {"success": true, "message": "Moved "+ direction +" to "+ currentLoc.name};
            } else {
                return {"success": false, "message": allowedMove(currentLoc.location[direction])};
            }
        };
        getCurrentLocation = function() {
            if (self.silenti.scenes[self.silenti.players.self.location]) {
                return self.silenti.scenes[self.silenti.players.self.location];
            }
            return 'Invalid';
        };
        allowedMove = function(loc) {
            var reason = "";
            if (self.silenti.scenes[loc] && self.silenti.scenes[loc].allowed.denied) {
                for(var i = 0; i < self.silenti.scenes[loc].allowed.need.length; i++) {
                    if(i < 0) {
                        reason += '<br/>';
                    }
                    reason += self.silenti.scenes[loc].allowed.need[i].reason;
                }
                return reason;
            }
            return true;
        };
        setCurrentLocation = function(newLoc) {
            if (self.silenti.scenes[newLoc]) {
                self.silenti.players.self.location = newLoc;
            }
            return 'Invalid';
        };
        self.getPlayerSelf = function() {
            return self.silenti.players.self;
        };

        self.getInventory = function() {
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

        self.getObjectsList = function() {
            console.log("getObjectsList");
            var objects = getCurrentLocation().objects;
            console.log(objects);
            var tmpArray = [];
            for (var i = 0; i < objects.length; i++) {
                tmpArray.push(objects[i].name);
            }
            return tmpArray;
        };

        self.init = function(cb) {
            if (cb) self.getSilentiStory(cb);
        };

        return self;
    }
);