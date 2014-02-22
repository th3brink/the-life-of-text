angular.module('lifeOfText.services', [])
    .factory('Parser', function() {

      var syntax = [];

      var objects = [];
      var objectsInInventory = [];
      var verbs = {
        "inventory": {"variations": ["inv", "inventory"], "structure": "inventory"},
        "go": {"variations": ["go", "walk"], "structure": "go {{direction}}"},
        "look": {"structure": "look [[at] {{object}}]"},
        "put": {"variations":["put", "drop"], "structure": "put [the] {{object}} on [the] {{object}}"},
        "use": {"structure": "use [the] {{object}} [on {{object}}]"},
        "take": {"variations": ["take", "grab", "get"], "structure": "take [the] {{object}}"},
        "help": {"structure": "help [{{object}}]"},
        "attack": {"variations": ["attack", "fight", "bash"], "structure": "attack [with] [the] {{object}}"},
        "consume": {"variations": ["consume", "eat"], "structure": "consume [the] {{object}}"}
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
        console.log(isGoodSyntax());
        return isGoodSyntax();
      };

      var isGoodSyntax = function() {
        var sentenceStructureOfVerb = getSyntaxStructureOfVerb(syntax[0].word);
        var sentenceStructureOfCommand = getSentenceStructureFromSyntax();
        var sentenceStructureOfVerbVariations;

        sentenceStructureOfVerbVariations = getVariationsOnSyntaxStructureAsArray(sentenceStructureOfVerb);
        if(syntax[0].type === "verb") {
          for(var i = 0; i < sentenceStructureOfVerbVariations.length; i++) {
            if(sentenceStructureOfVerbVariations[i] === sentenceStructureOfCommand) {
              return {"success": true, "structure": sentenceStructureOfCommand, "function": getFunctionCallFromSyntax()};
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

      var getFunctionCallFromSyntax = function() {
        var functionCall =  {};
        functionCall.name = syntax[0].word;
        functionCall.params = [];
        for(var i = 1; i < syntax.length; i++) {
          if(syntax[i].type !== "nothing") {
            functionCall.params.push(syntax[i].word);
          }
        }
        return functionCall;
      };

      var getSyntaxError = function () {
        return "I don't understand.";
      };

      var parseArrayIntoSyntaxJson = function(wordsInArray) {
        var type;
        var word;
        syntax = [];
        for(var i = 0; i < wordsInArray.length; i++) {
          var isObjectResult = isObject(wordsInArray, i);
          var isInventoryResult = isInventory(wordsInArray, i);
          if(isObjectResult.success) {
            i += isObjectResult.increment;
            word = isObjectResult.word;
            type = "object";
          } else if(isInventoryResult.success) {
            i += isInventoryResult.increment;
            word = isInventoryResult.word;
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

      var isObject = function(wordsInArray, i) {
        return isMatchInArray(wordsInArray, i, objects);
      };

      var isInventory = function(wordsInArray, i) {
        return isMatchInArray(wordsInArray, i, objectsInInventory);
      };

      var isMatchInArray = function(arrayWithSearchTerms, i, arrayToSearch) {
        var possibleMatches = inArray(arrayWithSearchTerms[i], arrayToSearch);
        var isFound = false;
        var partialWord = arrayWithSearchTerms[i];
        var increment = 1;
        if(possibleMatches !== true) {
          for(var j = 0; j < possibleMatches.length; j++) {
            if(typeof possibleMatches[j] === "string") {
              do {
                partialWord += " " + arrayWithSearchTerms[i + increment];
                if(partialWord === possibleMatches[j]){
                  isFound = true;
                }
                increment++;
              } while(! isFound && increment < arrayWithSearchTerms.length - 1);
            }
          }
        } else {
          isFound = true;
        }
        return {"success": isFound, "word": partialWord, "increment": increment};
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
        return '';
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
        var possibleMatches = [];
        var splitWord;
        for(var i = 0; i < array.length; i++) {
          if(array[i] === word) {
            return true;
          } else {
            splitWord = array[i].split(' ');
            for(var j = 0; j < splitWord.length; j++) {
              if(splitWord[j] === word) {
                possibleMatches.push(array[i]);
              }
            }
          }
        }
        if(possibleMatches !== []) {
          return possibleMatches;
        } else {
          return false;
        }
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

      var setObjects = function(objectsInRoom, objectsInInventory) {
        objects = objectsInRoom;
        inventory = objectsInInventory;
      };

      return {
        parseCommand: parseCommand,
        setObjects: setObjects
      };
    });