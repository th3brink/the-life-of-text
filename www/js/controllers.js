angular.module('lifeOfText.controllers', [])

.controller('TermIndexCtrl', function($location, $scope, Parser) {

    var listOfCommands = ["look", "east", "west", "north", "south", "pickup", "pick up", "open", "combine", "help", "talk"];
    var isInCommands = false;
    $scope.console = [];
    $scope.command = "";
    $scope.submit = function() {
        if ($scope.command) {
            Parser.parseCommand($scope.command);
            $scope.console.push($scope.command);
            $scope.console.push(Parser.parseCommand($scope.command));
            $scope.command = "";
            
        }
    };

    $scope.$on('fin', function(ngRepeatFinishedEvent) {
        document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
    });
})
// A simple controller that shows a tapped item's data
.controller('HomeIndexCtrl', function($scope, $stateParams /*, PetService*/ ) {
    // "Pets" is a service returning mock data (services.js)
    //$scope.pet = PetService.get($stateParams.petId);
});