var typeCalculator = angular.module('typeCalculator.controllers', ['ionic', 'ngResource'])

typeCalculator.controller("TypeCtrl", function($scope, Types) {
  // all types are created as objects with a name and lists of weaknesses,
  // resistances, and immunities
  $scope.Types = Types.getTypes();

  //initialized as empty because default type is not assigned
  $scope.type1= $scope.Types.fair;
  $scope.type2="";
  var test="Ghost"
  //var currentDRM={bug:1, dark:2};

  var lookup = {};
  for (var prop in $scope.Types) {
      lookup[$scope.Types[prop].name] = prop;
  };
  lookup['corn']='corn';
  $scope.lookup = lookup;
  //$scope.send = function() {return lookup[test];};
  //$scope.immune = function(immunities) {
  //  var immune = [];
  //  for (var i=0, len=immunities.length; i<len; i++) {
  //    immune.push({immunities});
  //  };
  //  return immune;
  //}

  //findType = function(tName) {return lookup[tName];};

  setType1 = function(tName) {$scope.type1 = $scope.Types[lookup[tName]]};
  setType2 = function(tName) {$scope.type2= tName;};
  $scope.setTypes = function(t1,t2) {
    setType1(t1);
    setType2(t2);
  };
  $scope.setDRM = function() {currentDRM = updateDRM(type1);};
  $scope.getType1 = function() {return $scope.type1;};
  $scope.getType1res = function() {return $scope.type1.resists;};
  $scope.getType1weak = function() {return $scope.type1.weakTo;};
  $scope.getType1imm = function() {return $scope.type1.immuneTo;};
  $scope.getType2 = function() {return $scope.type2;};
  $scope.getTypeList = function() {return typeList;};
  //DRM refers to damage recieved multiplier
  updateDRM = function(typeA) {
    var updatedDRM = [];
    for (type in typeList) {
      if (type in typeA.weakTo) {
        updatedDRM[type]=2.0;
//      } else if (type in resists) {
//        updatedDRM[type]=existingDRM[type]*0.5;
//      } else if (type    in immuneTo) {
//        updatedDRM[type]=0;
      } else {
        updatedDRM[type]=1.0;
      };
    };
    return updatedDRM;
  };

  $scope.getDRM = function() {return currentDRM;};
  //calculate resistances and weakness for inputted types
  // 1x for neutral, 2x for a se, 1/2x for nve, and 0x for immune
  $scope.calculateDRM = function(typeA, typeB) {
      firstDRM = updateDRM(typeA,typeB);
      //secondDRM = updateDRM(firstDRM, weaknessDict[typeB],
      //  resistDict[typeB], immuneDict[typeB]);

      return firstDRM;
    };


});