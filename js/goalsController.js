"use strict"

goalbusterApp.controller('GoalbusterController', ['$q', 'GoalFactory','GoalService', function($q, GoalFactory, GoalService) {
  var self = this;

  self.goals = []

  GoalService.getAll().then(_saveGoals)

  function _saveGoals(response) {
    self.goals = response
  }

  self.addNewGoal = function(newGoal) {
    self.goals.push(new GoalFactory(newGoal));
  };

}]);