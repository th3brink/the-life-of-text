angular.module('lifeOfText.services')
    .factory('Executor', function() {

    	var executeCommand = function(data) {
    		var action = data.name;
    		var params = data.params;
    		return commands[action](params);
    		
    	}

    	var commands = {
	    	go: function(params) {
	    		return "I'm here in the the room";
	    	},
	    	take: function(params) {
	    		return "I'm the take function";
	    	},
	    	put: function(params) {
	    		return "I'm the put function";
	    	},
	    	look: function(params) {
	    		return "I'm the look funtion";
	    	},
	    	inventory: function(params) {
	    		return "I'm the inventory";
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