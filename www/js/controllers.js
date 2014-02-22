angular.module('lifeOfText.controllers', []).controller('TermIndexCtrl', function($location, $scope, $sce, Parser, Executor) {
    $scope.console = [];
    $scope.command = "";
    var output = "";

    $scope.submit = function() {
        if ($scope.command) {
            var parsed = Parser.parseCommand($scope.command);

            if (parsed.success) {
                output = Executor.executeCommand(parsed.function);

                if (typeof output !== String) {
                    output = output.toString();
                }

            } else {
                output = parsed.message;
            }

            output = $sce.trustAsHtml(output);

            $scope.console.push({
                input: '>' + $scope.command,
                output: output
            });
            $scope.command = "";
            output = "";
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