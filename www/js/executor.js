angular.module('lifeOfText.services')
    .factory('Executor', function(Adventure, Parser) {

        var executeCommand = function(data) {
            var action = data.name;
            var params = data.params;
            return commands[action](params);
            
        };

        Adventure.init(function () {
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
                return "I'm the take function";
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
	    	

        return {
            executeCommand: executeCommand
        };
    }
);