angular.module('lifeOfText.services')
    .factory('Executor', function(Adventure) {

        var executeCommand = function(data) {
            var action = data.name;
            var params = data.params;
            return commands[action](params);
            
        };

        var commands = {
            go: function(params) {
                return Adventure.move(params[0]);
            },
            take: function(params) {

                console.log(params);

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
            },
            attack: function(params) {
                return "Attack all the things!";
            },
            consume: function(params) {
                return "Consume all the things!";
            },

        };

        return {
            executeCommand: executeCommand
        };
    }
);