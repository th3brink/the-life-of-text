var parser = function() {
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

  var parseCommand = function(words) {
    var array = splitCommandIntoArray(words);
    var syntax = parseArrayIntoSyntaxJson(array);
    return syntax;
  };

  var parseArrayIntoSyntaxJson = function(wordsInArray) {
    var syntax = [];
    var type;
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
    return syntax;
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