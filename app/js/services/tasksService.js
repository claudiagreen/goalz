"use strict"

goalbusterApp.service('TasksService',['TasksFactory', '$http', function(TasksFactory, $http){
  self = this;

  self.getAllFromApi = function(goalId){
    if (!!goalId) {
        return $http.get('https://goalbuster-api.herokuapp.com/goals/' + goalId +'/tasks.json')
    .then(_handleResponseFromApi);
    } else {
          return $http.get('https://goalbuster-api.herokuapp.com/tasks.json')
      .then(_handleResponseFromApi);
    }
  };

  self.postTaskToApi = function(formObj, goalId){
    return $http({
      method: 'POST',
      url: 'https://goalbuster-api.herokuapp.com/goals/' + goalId + "/tasks",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: _formatPOSTData(formObj)
    });
  }

  self.editTaskOnApi = function(taskObj){
    return $http({
      method: 'PUT',
      url: 'https://goalbuster-api.herokuapp.com/tasks/' + taskObj.id,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: _formatPOSTData(taskObj)
    });
  }

  self.deleteTaskOnApi = function(taskObj){
    return $http({
      method: 'DELETE',
      url: 'https://goalbuster-api.herokuapp.com/tasks/' + taskObj.id,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
  }

  function _handleResponseFromApi(response) {
    return response.data.map(_createTaskFromData);
  };

  function _createTaskFromData(TaskData) {
    var newTask = new TasksFactory()
    newTask.name = TaskData.name;
    newTask.id = TaskData.id;
    newTask.frequency = TaskData.frequency;
    newTask.completed =  TaskData.completed;
    newTask.goalId = TaskData.goal_id;
    return newTask;
  }

  function _formatPOSTData(DataObj) {
    return JSON.stringify(DataObj);
  }
}])




// 'http://localhost:3000/goals/goals/'
//https://goalbuster-api.herokuapp.com
