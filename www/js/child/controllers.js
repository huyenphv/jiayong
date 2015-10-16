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

.controller('MyTasksCtrl', function($scope,$window, $state, $ionicLoading) {
  var config = { cache: false };
  $scope.activeTab = 1;
  $scope.changeActiveTab = function(tab){
    $scope.activeTab = tab;  
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("luke"));
    //detail view
  $scope.detail = function(event){
      $state.go('menu.tab.view-my-task',{'id' : event.id});
  };
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

.controller('MyProposedTasksCtrl', function($scope, $stateParams,$window) {
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


.controller('ViewMyTaskDetailCtrl', function($rootScope, $http, $scope, $ionicActionSheet, $filter,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;

  $scope.allTasks = JSON.parse($window.localStorage['tasks']);

  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];

  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
  $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
  // take photo and submit task

  //take photo
   $scope.takeUpTask = function(){
      $scope.task.isAvailable = false;
      $scope.task.isCompleted = false;
   }

   $scope.openCameraActionSheet = function(){
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: 'Use Camera' },
            { text: 'Choose Photo' }
          ],
          cancelText: 'Cancel',
          cancel: function() {
          },
          buttonClicked: function(index) {
            var source = 0;

        if (navigator.camera) {
          if (index == 0) {
            source = navigator.camera.PictureSourceType.CAMERA;
          } else if (index == 1) {
            source = navigator.camera.PictureSourceType.PHOTOLIBRARY || 0;
          }

          var config = {
            quality: 75,
            sourceType: source,
            encodingType: navigator.camera.EncodingType.PNG,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            correctOrientation: true,
            allowEdit: true,
            saveToPhotoAlbum: true
          };

          navigator.camera.getPicture(

            function(imageURI) {

              $scope.task.photos.push(imageURI);
             
            }, function(err) {
              console.err(err);
            },
            config);
        } else {
          $rootScope.message = 'Unable to access camera. Are you on browser?';
        }

        return true;
      }
    });
    };

   //show modal 
    $scope.editPhoto = function(){
      $scope.copyOfPhotos = $scope.task.photos.slice(0);
      $scope.modalPhoto.show();
    };
    
    //cancle photo remove 
    //revert the changes to orignal 
    $scope.cancelPhotoEdit = function() {
        $scope.modalPhoto.hide();
    };
    //remove the selected photo
    $scope.removePhoto = function($index){
      $scope.copyOfPhotos.splice($index,1);
    };
    //remove the photo from actual array
    //reset the copy to blank
    $scope.donePhotoEdit = function(){
      $scope.modalPhoto.hide();
      $scope.task.photos = $scope.copyOfPhotos;
      $scope.copyOfPhotos = {};

    };

   $scope.completeTask = function(){
      var request = {
            "appId": 8,
            "properties": [
                {"isCompleted": true}
            ]
        };
    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
       var index = $scope.luke.availableTasks.indexOf(data);
        $scope.luke.availableTasks.splice(index,1);
        $scope.luke.completedTasks.push(data);
        var daisyIndex = $scope.daisy.availableTasks.indexOf(data);
        $scope.daisy.availableTasks.splice(index,1);
        $scope.daisy.completedTasks.push(data);
        $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
        $window.localStorage['luke'] = JSON.stringify($scope.luke);
        $http.put("http://161.202.13.188:9000/api/object/871/update/properties",
        {
          
          "appId": 8,
          "propertyName": 
            [
              {"availableTasks": $scope.luke.availableTasks},
              {"completedTasks": $scope.luke.completedTasks}
            ]

        },config)
      .success(function(response, status) {
            $http.put("http://161.202.13.188:9000/api/object/873/update/properties",
            {
              
              "appId": 8,
              "propertyName": 
                [
                  {"availableTasks": $scope.luke.availableTasks},
                  {"completedTasks": $scope.luke.completedTasks}
                ]

            },config)
            .success(function(data, status) {
               $state.go('menu.tab.my-tasks',null,{reload:true});
            }).error(function(data, status){
              console.log(data);
            }).finally(function(){
              $ionicLoading.hide();
            });      
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
        $ionicLoading.hide();
    });
   }).error(function(data, status){
      console.log(data);
    }).finally(function(){
        $ionicLoading.hide();
    });
};

   // remove the task
   $scope.removeTask = function(){
    
   }

  $scope.retakeSubmit = function(){
    // retake photos and submit the task for approval again
  }
})

.controller('EditProposalCtrl', function($scope, $window) {
  var config = { cache: false };
  // get detail of task to edit

  $scope.submitProposal = function(){
    // submit the task for approval again
  }
  

});



