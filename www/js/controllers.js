angular.module('starter.controllers', [])
// A simple controller that fetches a list of data from a service
.controller('TermIndexCtrl', function($scope, PetService) {
    // "Pets" is a service returning mock data (services.js)
    //$scope.pets = PetService.all();
    var term;

    var help = [
		'%+r **** termlib.js text wrap sample **** %-r',
		' ',
		' * type "tests -w" for wrapping tests.',
		' * type "tests" (without option) to see the same texts without wrapping.',
		' * type "kant" for some longer text (by Immanuel Kant).',
		' * type "help" to see this page.',
		' * type "exit" to quit.',
		' '
	];

    function termOpen() {
        if ((!term) || (term.closed)) {
            term = new Terminal({
                x: 220,
                y: 70,
                termDiv: 'termDiv',
                bgColor: '#232e45',
                greeting: help.join('%n'),
                handler: termHandler,
                exitHandler: termExitHandler,
                wrapping: true
            });
            term.open();
            // dimm UI text
            var mainPane = (document.getElementById) ? document.getElementById('mainPane') : document.all.mainPane;
            if (mainPane) mainPane.className = 'lh15 dimmed';
            console.log("I'm inside");
        }
    }

    function termExitHandler() {
	// reset the UI
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15';
	}

	function termHandler() {
		// default handler + exit
		this.newLine();
		if (this.lineBuffer.match(/^\s*exit\s*$/i)) {
			this.close();
			return;
		}
		else if (this.lineBuffer.match(/^\s*tests\s+-w\s*$/i)) {
			this.write('starting tests with wrap %+ion%-i:');
			this.newLine();
			this.newLine();
			this.write(texts);
		}
		else if (this.lineBuffer.match(/^\s*tests\s*$/i)) {
			this.wrapOff();
			this.write('starting tests with wrap %+ioff%-i:');
			this.newLine();
			this.newLine();
			this.write(texts);
			this.wrapOn();
		}
		else if (this.lineBuffer.match(/^\s*kant\s*$/i)) {
			this.write(kant, true);
			return;
		}
		else if (this.lineBuffer.match(/^\s*help\s*$/i)) {
			this.clear();
			this.write(help);
		}
		else if (this.lineBuffer != '') {
			// echo with write for wrapping, but escape any mark-up
			this.write('You wrote: '+this.lineBuffer.replace(/%/g, '%%'));
			this.newLine();
		}
		this.prompt();
	}

    termOpen();
})
// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.pet = PetService.get($stateParams.petId);
});