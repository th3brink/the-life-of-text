angular.module('lifeOfText.services')
    .factory('Executor', function(Adventure) {

    	var executeCommand = function(data) {
    		var action = data.name;
    		var params = data.params;
    		return commands[action](params);
    		
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
	    		return "I'm the help function";
	    	}

	    };

    	return {
    		executeCommand: executeCommand
    	};

    });