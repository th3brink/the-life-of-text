var parser = function() {
  var syntax = [];

  var objects = [
    "sword",
    "key",
    "torch"
  ];
  var verbs = [
    "inventory",
    "inv",
    "go",
    "look",
    "put",
    "use",
    "take",
    "help"
  ];
  var directions = [
    "north", "n",
    "northeast", "ne",
    "east", "e",
    "southeast",
    "south", "s",
    "southwest", "sw",
    "west", "w",
    "northwest", "nw"
  ];
  var prepositions = [
    "at",
    "on",
    "onto",
    "with"
  ];
  var patterns = {
    "verb": "verb",
    "verbDirection": "verb direction",
    "direction": "direction",
    "verbObject": "verb object",
    "verbPrepositionObject": "verb preposition object",
    "verbObjectPrepositionObject": "verb object preposition object"
  };

  var parseCommand = function(words) {
    var array = splitCommandIntoArray(words);
    parseArrayIntoSyntaxJson(array);
    var json = fitsSyntax();
    if(json.success) {
      return syntax;
    } else {
      return json.message;
    }
  };

  var fitsSyntax = function() {
    var sentenceStructure = getSentenceStructureFromSyntax();
    var result = isPattern(sentenceStructure);
    if(result) {
      return {"success": true};
    } else {
      return {"success": false, "message": getSyntaxError()};
    }
  };

  var isPattern = function(sentenceStructure) {
    for(var prop in patterns) {
      if(patterns[prop] === sentenceStructure) {
        return prop;
      }
    }
    return false;
  };

  var getSentenceStructureFromSyntax = function() {
    var structure = "";
    for(var i = 0; i < syntax.length; i++) {
      structure += syntax[i].type + " ";
    }
    return structure.trim();
  };

  var getSyntaxError = function () {
    return "I don't understand.";
  };

  var parseArrayIntoSyntaxJson = function(wordsInArray) {
    var type;
    syntax = [];
    for(var i = 0; i < wordsInArray.length; i++) {
      if(isObject(wordsInArray[i])) {
        type = "object";
      } else if (isVerb(wordsInArray[i])) {
        type = "verb";
      } else if (isDirection(wordsInArray[i])) {
        type = "direction";
      } else if (isPreposition(wordsInArray[i])) {
        type = "preposition";
      } else {
        type = "nothing";
      }
      syntax.push({"word": wordsInArray[i], "type": type});
    }
  };

  isObject = function(word) {
    return inArray(word, objects);
  };

  isVerb = function(word) {
    return inArray(word, verbs);
  };

  isDirection = function(word) {
    return inArray(word, directions);
  };

  isPreposition = function(word) {
    return inArray(word, prepositions);
  };

  inArray = function(word, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] === word) {
        return true;
      }
    }
    return false;
  };

  var splitCommandIntoArray = function(command) {
    return command.toLowerCase().split(' ');
  };

  return {
    parseCommand: parseCommand,
    parseArrayIntoSyntaxJson: parseArrayIntoSyntaxJson,
    splitCommandIntoArray: splitCommandIntoArray
  };
}();