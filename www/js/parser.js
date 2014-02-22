var parser = function() {
  var syntax = [];

  var objects = [
    "sword",
    "key",
    "torch"
  ];
  var verbs = {
    "inventory": {"variations": ["inv", "inventory"], "structure": "inventory"},
    "go": {"variations": ["go", "walk"], "structure": "go {{direction}}"},
    "look": {"structure": "look [[at] {{object}}]"},
    "put": {"structure": "put {{object}} on {{object}}"},
    "use": {"structure": "use {{object}} [on {{object}}]"},
    "take": {"variations": ["take", "grab"], "structure": "take {{object}}"},
    "help": {"structure": "help [{{object}}]"}
  };
  var directions = {
    "north": {"variations": ["n", "north"]},
    "northeast": {"variations": ["ne", "northeast"]},
    "east": {"variations": ["e", "east"]},
    "southeast": {"variations": ["se", "southeast"]},
    "south": {"variations": ["s", "south"]},
    "southwest": {"variations": ["sw", "southwest"]},
    "west": {"variations": ["w", "west"]},
    "northwest": {"variations": ["nw", "northwest"]}
  };

  var parseCommand = function(words) {
    var array = splitCommandIntoArray(words);
    parseArrayIntoSyntaxJson(array);
    var goodSyntax = isGoodSyntax();
    if(goodSyntax.success) {
      return goodSyntax.structure;
    } else {
      return goodSyntax.message;
    }
  };

  var isGoodSyntax = function() {
    var sentenceStructureOfVerb = getSyntaxStructureOfVerb(syntax[0].word);
    var sentenceStructureOfCommand = getSentenceStructureFromSyntax();
    var sentenceStructureOfVerbVariations;

    sentenceStructureOfVerbVariations = getVariationsOnSyntaxStructureAsArray(sentenceStructureOfVerb);
    if(syntax[0].type === "verb") {
      for(var i = 0; i < sentenceStructureOfVerbVariations.length; i++) {
        if(sentenceStructureOfVerbVariations[i] === sentenceStructureOfCommand) {
          return {"success": true, "structure": sentenceStructureOfCommand};
        }
      }
    }
    return {"success": false, "message": getSyntaxError()};
  };

  var getSentenceStructureFromSyntax = function() {
    var sentenceStructure = "";
    var i = 0;
    for(var prop in syntax) {
      if(i === 0 || syntax[prop].type === "nothing") {
        sentenceStructure += syntax[prop].word + " ";
      } else {
        sentenceStructure += "{{" + syntax[prop].type + "}} ";
      }
      i += 1;
    }
    return sentenceStructure.trim();
  };

  var getSyntaxError = function () {
    return "I don't understand.";
  };

  var parseArrayIntoSyntaxJson = function(wordsInArray) {
    var type;
    var word;
    syntax = [];
    for(var i = 0; i < wordsInArray.length; i++) {
      if(isObject(word = wordsInArray[i])) {
        type = "object";
      } else if (isVerb(wordsInArray[i])) {
        word = isVerb(wordsInArray[i]);
        type = "verb";
      } else if (isDirection(wordsInArray[i])) {
        word = isDirection(wordsInArray[i]);
        if(i === 0) {
          addDefaultGoVerb();
        }
        type = "direction";
      } else {
        word = wordsInArray[i];
        type = "nothing";
      }
      syntax.push({"word": word, "type": type});
    }
  };

  var addDefaultGoVerb = function() {
    syntax.push({"word": "go", "type": "verb"});
  };

  var isObject = function(word) {
    return inArray(word, objects);
  };

  var isVerb = function(word) {
    return variationOfWordIsInObject(word, verbs);
  };

  var isDirection = function(word) {
    return variationOfWordIsInObject(word, directions);
  };

  var getSyntaxStructureOfVerb = function(word) {
    var variations;
    for(var prop in verbs) {
      if(prop === word) {
        return verbs[prop].structure;
      } else {
        if(typeof verbs[prop].variations !== "undefined") {
          variations = verbs[prop].variations;
          for(var i = 0; i < variations.length; i++) {
            if(variations[i] === word) {
              return verbs[prop].structure;
            }
          }
        }
      }
    }
    return false;
  };

  var variationOfWordIsInObject = function(word, object) {
    var variations;
    for(var prop in object) {
      if(prop === word) {
        return prop;
      } else {
        if(typeof object[prop].variations !== "undefined") {
          variations = object[prop].variations;
          for(var i = 0; i < variations.length; i++) {
            if(variations[i] === word) {
              return prop;
            }
          }
        }
      }
    }
    return false;
  };

  var inObject = function(word, object) {
    for(var prop in object) {
      if(prop === word) {
        return true;
      }
    }
    return false;
  };

  var inArray = function(word, array) {
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

  var getVariationsOnSyntaxStructureAsArray = function(syntaxStructure) {
    var closing;
    var opening;
    var variation = syntaxStructure;
    var variations = [variation.replace(/\[/g, '').replace(/\]/g, '').trim()];
    do {
      closing = variation.indexOf(']');
      opening = variation.substring(0, closing).lastIndexOf('[');
      variation = variation.substring(0, opening) +  variation.substring(closing + 1);
      if(variation.substring(opening, opening + 1) === " ") {
        variation = variation.substring(0, opening) + variation.substring(opening + 1);
      }
      variations.push(variation.replace(/\[/g, '').replace(/\]/g, '').trim());
    } while(variation.indexOf(']') > -1);
    return variations;
  };

  return {
    parseCommand: parseCommand
  };
}();