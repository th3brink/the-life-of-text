angular.module('starter.controllers', [])
// A simple controller that fetches a list of data from a service
.controller('TermIndexCtrl', function($location, $scope /*, PetService*/ ) {
    // "Pets" is a service returning mock data (services.js)
    //$scope.pets = PetService.all();
    var listOfCommands = ["look", "east", "west", "north", "south", "pickup", "pick up", "open", "combine", "help", "talk"];
    var isInCommands = false;
    $scope.console = [];
    $scope.command = "";
    $scope.glued = true;
    $scope.submit = function() {
        if ($scope.command) {
            $scope.console.push($scope.command);
            for (count = 0; count < listOfCommands.length; count++) {
                if ($scope.command.indexOf(listOfCommands[count]) == 0) {
                    isInCommands = true;
                    $scope.console.push($scope.command + " is a valid command.");
                    //parseCommand($scope.command);
                    break;
                }
            }
            if (!isInCommands) {
                $scope.console.push($scope.command + " is an invalid command.");
            }
            //$scope.console.push("You typed: " + $scope.command);
            $scope.command = "";
            isInCommands = false;

            //Push the Console div as far down the scroll as possible
            
        }
    }

    $scope.$on('fin', function(ngRepeatFinishedEvent) {
        document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
    });
})
// A simple controller that shows a tapped item's data
.controller('HomeIndexCtrl', function($scope, $stateParams /*, PetService*/ ) {
    // "Pets" is a service returning mock data (services.js)
    //$scope.pet = PetService.get($stateParams.petId);
});