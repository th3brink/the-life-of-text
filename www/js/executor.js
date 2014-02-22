angular.module('lifeOfText.services')
    .factory('Executor', function(Adventure, Parser) {

        var executeCommand = function(data) {
            var action = data.name;
            var params = data.params;
            return commands[action](params);
        };

        Adventure.init(function() {
            Parser.setObjects(Adventure.getObjectsList());
        });

        var commands = {
            go: function(params) {
                var result = Adventure.move(params[0]);
                if(result.success) {
                    Parser.setObjects(Adventure.getObjectsList());
                }
                return result.message;
            },
            take: function(params) {
                return Adventure.takeObject(params[0]);
            },
            put: function(params) {
                return "I'm the put function";
            },
            look: function(params) {
                return Adventure.getDescriptionOfCurrentScene();
            },
            inventory: function(params) {
                return Adventure.getInventory();
            },
            use: function(params) {
                return "I'm the use function";
            },
            help: function(params) {
                return "I'm the help function";
            },
            attack: function(params) {
                return "Attack all the things!";
            },
            consume: function(params) {
                return "Consume all the things!";
            }
        };

    	var commands = {
	    	go: function(params) {
                var currentLoc = Adventure.getCurrentLocation(),
                    returnMe = "";
                if (currentLoc.location[params] !== null && Adventure.allowedMove(currentLoc.location[params])) {
                    currentLoc.location.visited = true;
                    Adventure.setCurrentLocation(currentLoc.location[params]);
                    currentLoc = Adventure.getCurrentLocation();
                    returnMe = "Moved "+ params +" to "+ currentLoc.name;
                } else {
                    returnMe = "invalid location";
                }
	    		return returnMe;
	    	},
	    	take: function(params) {

                console.log(params)

	    		return "I'm the take function";
	    	},
	    	put: function(params) {
	    		return "I'm the put function";
	    	},
	    	look: function(params) {
	    		return "I'm the look function";
	    	},
	    	inventory: function(params) {
	    		return Adventure.getInventory();
	    	},
	    	use: function(params) {
	    		return "I'm the use function";
	    	},
	    	help: function(params) {
	    		helpString = "************<br>" +
	    					 "*** HELP ***<br>" +
	    					 "************<br>" +
	    					 "These are the allowed commands:<br>" +
	    					 "inventory: See what you are currently holding.<br>" +
					         "go: Direction to go (n, s, e, w).<br>" +
					         "look: See what is around you.<br>" +
					         "put: Drop an object from your inventory.<br>" +
					         "use: Combine 2 objects.<br>" +
					         "take: Pick up an object.<br>" +
					         "help: This screen. Type help 'command' for other uses.<br>";

				return helpString;
	    	}
	    };

    	return {
    		executeCommand: executeCommand
    	};
    }
);
