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

        self.getDescriptionOfCurrentScene = function() {
            var currentLoc = getCurrentLocation();
            return currentLoc.description;
        };

        self.move = function(direction) {
            var currentLoc = getCurrentLocation();
            var newLocation = currentLoc.location[direction];
            if (currentLoc.location[direction] !== null && allowedMove(currentLoc.location[direction]) === true) {
                if(getLocationAtId(newLocation).type === "door") {
                    newLocation = getLocationAtId(newLocation).location[direction];
                }
                currentLoc.location.visited = true;
                setCurrentLocation(newLocation);
                currentLoc = getCurrentLocation();
                return {"success": true, "message": "Moved "+ direction +" to "+ currentLoc.name};
            } else {
                return {"success": false, "message": allowedMove(currentLoc.location[direction])};
            }
        };
        getLocationAtId = function(id) {
            if (self.silenti.scenes[id]) {
                return self.silenti.scenes[id];
            }
            return false;
        };
        getCurrentLocation = function() {
            return getLocationAtId(self.silenti.players.self.location);
        };
        allowedMove = function(loc) {
            var reason = "";
            if (self.silenti.scenes[loc]) {
                if(self.silenti.scenes[loc].allowed.need) {
                    for(var i = 0; i < self.silenti.scenes[loc].allowed.need.length; i++) {
                        if(! hasObjectInInventory(self.silenti.scenes[loc].allowed.need[i].object)) {
                            if(i < 0) {
                                reason += '<br/>';
                            }
                            reason += self.silenti.scenes[loc].allowed.need[i].reason;
                        }
                    }
                    if(reason !== "") {
                        return "You can't go there. " + reason;
                    }
                } else if(self.silenti.scenes[loc].allowed.denied) {
                    return "You can't go there.";
                }
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
        inventoryAdd = function (addMe) {
            self.silenti.players.self.inventory.push(addMe);
        };
        self.inventoryRemove = function (addMe) {
            for (var i = 0; i < self.silenti.players.self.inventory.length; i++) {
                if (self.silenti.players.self.inventory[i]) {
                    self.silenti.players.self.inventory.splice(i, 1);
                }
            }
        };
        hasObjectInInventory = function(object) {
            var objects = self.getInventory();
            var hasObject = false;
            for (var i = 0; i < objects.length; i++) {
                if(objects[i] === object) {
                    hasObject = true;
                }
            }
            return hasObject;
        };

        self.takeObject = function(object) {
            inventoryAdd(object);
            return "You took the " + object;
        };

        self.getObjectsList = function() {
            var objects = getCurrentLocation().objects;
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