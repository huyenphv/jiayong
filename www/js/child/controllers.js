angular.module('jiaYongAppChild.controllers', [])
/* @screen: Logout of the app */
.controller('LogoutCtrl', function(
$scope, $http, $ionicModal, $ionicActionSheet, $ionicLoading)
{
  $scope.tryLogout = function(){
    var config = { cache: false };
    
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Logging out..'
    });

    $http.post("http://161.202.13.188:9000/user/logout",config)
    .success(function(data, status) {
       window.location.href = 'index.html#/login';
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
      $ionicLoading.hide();
    });
  };

  $scope.tryLogout();
})

.controller('ProposeTaskCtrl', function($scope, $stateParams, $window, $ionicLoading) {
  //$scope.chat = Chats.get($stateParams.chatId);

  // to propose a task, idk is this correct though lol
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
  $scope.task =
  {
    country: "Singapore",
    region: "",
    city: "Singapore",
    name: "",
    objectTypeId: 32,
    userId: $scope.currentUser.id,
    appId: 8,
    name: "",
    startDate: "",
    startTime: "",
    description: "",
    Average: 0,
    Good: 0,
    Excellent: 0,
    assignTo: 0
    
  };
  
  $scope.proposeTask = function(){
    $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Creating task..'
    });
    $scope.newTask =
    {
      country: "Singapore",
      region: "Singapore",
      city: "Singapore",
      name: $scope.task.name,
      objectTypeId: 35,
      userId: $scope.currentUser.id,
      appId: 8,
      properties: [
          {name: $scope.task.name},
          //{startDate: $scope.task.startDate},
          //{startTime: $scope.task.startTime},
          {description: $scope.task.description},
          {Average: $scope.task.averageAmount},
          {Good: $scope.task.goodAmount},
          {Excellent: $scope.task.excellentAmount},
          {isAvailable: false},
          {isCompleted: false},
          {isProposed: true},
          {isApproved: false},
          {photos: []},
          //{assignTo: $scope.task.assignTo}
      ]
    };
  $http.post("http://161.202.13.188:9000/api/object/create",JSON.stringify($scope.newTask),config)
  .success(function(data, status) {
     $scope.availableTasks = JSON.parse($window.localStorage.getItem("availableTasks"));
     if ($scope.availableTasks == null)
     {
        $scope.availableTasks = [];
     }
     $scope.availableTasks.push(data);
     $window.localStorage['availableTasks'] = $scope.availableTasks;
     console.log(data);
     console.log($scope.availableTasks);
     window.location.href = 'jiaYong-child.html#/my-tasks';
  }).error(function(data, status){
    console.log(data);
  }).finally(function(){
    $ionicLoading.hide();
  });
  };

})

.controller('MyTasksCtrl', function($scope, $stateParams,$window) {
  var config = { cache: false };
  $scope.activeTab = 1;

  $scope.changeActiveTab = function(tab){
    $scope.activeTab = tab;  
  }
  // $scope.tasksAvailable = JSON.parse($window.localStorage.getItem("availableTasks"));
  $scope.tasksAvailable = [];
  if($scope.tasksAvailable == null)
  {
    $scope.tasksAvailable = [];
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
})

.controller('ProfileCtrl', function($scope, $window) {
  var config = { cache: false };
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
})


.controller('ViewTaskCtrl', function($scope, $window) {
  var config = { cache: false };
  // get individual task according to ID

  // take photo and submit task

  //take photo
   $scope.takePhoto = function(){

   }

   //complete task isCompleted == true
   $scope.takePhoto = function(){
    
   }

   $scope.completeTask = function(){

   }

   // remove the task
   $scope.removeTask = function(){
    
   }

  $scope.retakeSubmit = function(){
    // retake photos and submit the task for approval again
  }

});

.controller('EditProposalCtrl', function($scope, $window) {
  var config = { cache: false };
  // get detail of task to edit

  $scope.submitProposal = function(){
    // submit the task for approval again
  }
  

});



