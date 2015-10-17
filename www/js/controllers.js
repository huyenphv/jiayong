angular.module('jiaYongApp.controllers', [])
/* @screen: Logout of the app */
.controller('LogoutCtrl', function(
$scope, $http, $ionicModal, $ionicActionSheet, $ionicLoading, $rootScope)
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
  $scope.currentUser = JSON.parse($window.localStorage.getItem("daisy"));
  
    //detail view
  $scope.detail = function(event){
      $state.go('menu.tab.manage-task',{'id' : event.id});
  };

  $scope.viewPendingApprovalForCompletedTask = function(task){
      $state.go('menu.tab.pending-approval-completed-task-view',{'id' : event.id});
  }
})

.controller('ViewMyTaskDetailCtrl', function($scope, $filter,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;

  $scope.allTasks = JSON.parse($window.localStorage['tasks']);

  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];

})

.controller('ViewCompletedTaskDetailCtrl', function($scope, $filter,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;

  $scope.allTasks = JSON.parse($window.localStorage['daisy'].completedTasks);

  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];

})

.controller('CreateTaskCtrl', function($scope, $state, $window, $http,$ionicLoading, $rootScope) {
  var config = { cache: false };
  var self = this;
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
   $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
   console.log($scope.luke);
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
    // $scope.showDate = function() {
    //   if (typeof datePicker !== 'undefined') {
    //     var today = new Date();
    //     var cdate = new Date();
    //     if ($scope.task.startDate != '') {
    //       cdate = new Date($scope.task.startDate);
    //       if (cdate == 'Invalid Date') {
    //         cdate = new Date();
    //       }
    //     }
    //     var options = {
    //       date: cdate,
    //       minDate: today.toDateString(),
    //       allowOldDates: false,
    //       allowFutureDates: true,
    //       mode: 'date'
    //     };

    //     datePicker.show(
    //       options,
    //       function(date) {
    //         if (date == 'Invalid Date') return;
    //         $scope.task.startDate = date.toDateString();
    //         document.getElementById('date').value = $scope.task.startDate;
    //       }
    //     );
    //   } else {
    //     $scope.message = 'Date Picker is not available. Are you on browser?';
    //   }
    // };

    // $scope.showTime = function() {
    //     if (typeof datePicker !== 'undefined') {
    //         var today = new Date();
    //         var ctime = new Date();
    //         if (typeof $scope.task.startTime !== 'undefined' && $scope.task.startTime != '') {
    //           ctime.setTime($scope.task.time_in_ms);
    //         }
    //         var options = {
    //           date: ctime,
    //           minDate: today,
    //           minuteStep: 1,
    //           mode: 'time'
    //         };

    //         datePicker.show(
    //           options,
    //            function(dateTime) {
    //             if (dateTime == 'Invalid Date') return;
    //       //      $scope.event.time = dateTime.toTimeString();
    //             $scope.task.time_in_ms = dateTime.getTime();
    //             dateTime.setSeconds(0);
    //             var realDateTime = new Date(dateTime);
    //             realDateTime = realDateTime.toTimeString();
    //             realDateTime = realDateTime.substring(0,realDateTime.indexOf("GMT"));
    //             $scope.task.startTime = realDateTime;
    //            // $scope.event.time_formated = $scope.event.time.substr(0,5);
    //             document.getElementById('time').value = $scope.task.startTime;
    //           }
    //         );

    //     } else {
    //         $scope.message = 'Time Picker is not available. Are you on browser?';
    //     }
    // };

    if ($scope.currentUser.name == "")
    {
      $scope.contacts = 
      [ {name : "Luke",
          id : 871
        },
        {name : "Ben",
          id : 872
        }

      ];
    };
    
    $scope.tryCreate = function(){
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
            {startDate: $scope.task.startDate},
            {startTime: $scope.task.startTime},
            {description: $scope.task.description},
            {Average: $scope.task.averageAmount},
            {Good: $scope.task.goodAmount},
            {Excellent: $scope.task.excellentAmount},
            {isAvailable: "true"},
            {isCompleted: "false"},
            {isProposed: "false"},
            {isApproved: "false"},
            {photos: []},
            {assignTo: $scope.task.assignTo},
            {reward: 0},
            {rejectMessage: ""},
            {isApprovedProposed: "false"}
        ]
      };
    $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
    $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
    $http.post("http://161.202.13.188:9000/api/object/create",JSON.stringify($scope.newTask),config)
    .success(function(data, status) {
       $scope.daisy.availableTasks.push(data);
       $scope.luke.availableTasks.push(data);
       $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
       $window.localStorage['luke'] = JSON.stringify($scope.luke);
       $http.post("http://161.202.13.188:9000/api/object/871/relationship/add/"+data.id,
        {
          
          "appId": 8,
          "propertyName": "availableTasks"

        },config)
      .success(function(response, status) {
        $http.post("http://161.202.13.188:9000/api/object/873/relationship/add/"+ data.id,
          {
            "appId": 8,
            "propertyName": "availableTasks"        
          
        },config)
        .success(function(data, status) {
           
        }).error(function(data, status){
          console.log(data);
        })
      }).error(function(data, status){
        console.log(data);
      });
      $state.go('menu.tab.my-tasks',{},{reload:true});
       // window.location.href = 'jiaYong.html#/my-tasks';
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
          $ionicLoading.hide();
    });
  };
})

.controller('ManageTaskCtrl', function($scope, $state, $filter, $stateParams, $window, $http,$ionicLoading, $rootScope) {
  var config = { cache: false };
  $scope.users = JSON.parse($window.localStorage.getItem("users"));
  $scope.currentUser = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
    // get individual task according to ID
  $scope.taskId = $stateParams.id;

  $scope.allAvailableTasks = $scope.currentUser.availableTasks;

  $scope.task = $filter('filter')($scope.allAvailableTasks, {id:$scope.taskId})[0];
  $scope.assignToUser = $filter('filter')($scope.users, {id:$scope.task.assignTo})[0];
   $scope.showDate = function() {
    if (typeof datePicker !== 'undefined') {
      var today = new Date();
      var cdate = new Date();
      if ($scope.task.startDate != '') {
        cdate = new Date($scope.task.startDate);
        if (cdate == 'Invalid Date') {
          cdate = new Date();
        }
      }
      var options = {
        date: cdate,
        minDate: today.toDateString(),
        allowOldDates: false,
        allowFutureDates: true,
        mode: 'date'
      };

      datePicker.show(
        options,
        function(date) {
          if (date == 'Invalid Date') return;
          $scope.task.startDate = date.toDateString();
          document.getElementById('date').value = $scope.task.startDate;
        }
      );
    } else {
      $scope.message = 'Date Picker is not available. Are you on browser?';
    }
  };

  $scope.showTime = function() {
      if (typeof datePicker !== 'undefined') {
          var today = new Date();
          var ctime = new Date($scope.task.startDate);
          if ($scope.task.startTime != '') {
              if(typeof $scope.task.time_in_ms !== 'undefined'){
                  ctime.setTime($scope.task.time_in_ms);
              }else{
                  ctime.setHours($scope.task.startTime.substr(0,2));
                  ctime.setMinutes($scope.task.startTime.substr(3,2));
              }
          }
          if (ctime == 'Invalid Date'){
              ctime = new Date($scope.task.startDate);
          }
          var options = {
            date: ctime,
            minDate: today,
            minuteStep: 1,
            mode: 'time'
          };
          datePicker.show(
            options,
             function(dateTime) {
              if (dateTime == 'Invalid Date') return;
              dateTime.setSeconds(0);
              var realDateTime = new Date(dateTime);
              realDateTime = realDateTime.toTimeString();
              realDateTime = realDateTime.substring(0,realDateTime.indexOf("GMT"));
              $scope.task.startTime = realDateTime;
           //   $scope.event.time_formated = $scope.event.time.substr(0,5);
              $scope.task.time_in_ms = dateTime.getTime();
              document.getElementById('time').value = $scope.task.startTime;
            }
          );

      } else {
          $scope.message = 'Time Picker is not available. Are you on browser?';
      }
  };  

  
  $scope.tryUpdate = function(){
      $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Modifying task..'
      });
      $scope.newTask =
      {
        country: "Singapore",
        region: "Singapore",
        city: "Singapore",
        name: $scope.task.name,
        objectTypeId: 35,
        userId: 7,
        appId: 8,
        properties: [
            {name: $scope.task.name},
            {startDate: $scope.task.startDate},
            {startTime: $scope.task.startTime},
            {description: $scope.task.description},
            {Average: $scope.task.Average},
            {Good: $scope.task.Good},
            {Excellent: $scope.task.Excellent},
            {isAvailable: "true"},
            {isCompleted: "false"},
            {isProposed: "false"},
            {isApproved: "false"},
            {photos: []},
            {assignTo: $scope.task.assignTo}
        ]
      };
    $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
    $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
    $http.put("http://161.202.13.188:9000/api/object/update/" + $scope.taskId,JSON.stringify($scope.newTask),config)
    .success(function(data, status) {
       // // $scope.allAvailableTasks.push(data);
       // $scope.luke.availableTasks.push(data);
       // $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
       // $window.localStorage['luke'] = JSON.stringify($scope.luke);
       // window.location.href = 'jiaYong.html#/my-tasks';
       $http.get(
          "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
        .success(function(data, status) { 
            $window.localStorage['users'] = JSON.stringify(data);
            $window.localStorage['daisy'] = JSON.stringify(data[0]);
            // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
            $window.localStorage['luke'] = JSON.stringify(data[2]);
            $ionicLoading.hide();
            $state.go('menu.tab.my-tasks',null,{reload:true});
        }).error(function(data, status){
          $ionicLoading.hide();
          $scope.message = data;
        });
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
        $ionicLoading.hide();
    });
    
  };
})
.controller('ViewCompletedPendingApprovalTaskDetailCtrl', function(TasksCrud, $scope, $stateParams, $window, $http, $filter, $rootScope, $state) {
   var config = { cache: false };
    // get individual task according to ID
    $scope.taskId = $stateParams.id;
    $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
    $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
    $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
    $scope.allPendingTasks = JSON.parse($window.localStorage['daisy']).completedTasks;
    $scope.task = $filter('filter')($scope.allPendingTasks, {id:$scope.taskId})[0];
    $scope.approveTask = function (){
      var request = {
          "appId": 8,
          "properties": [
              {"isApproved": "true"},
              {"reward" : $scope.task.reward},
              {"photos" : $scope.task.photos}
          ]
      };
    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",request,config)
    .success(function(data, status) {
       $http.get(
            "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
          .success(function(data, status) { 
              $window.localStorage['users'] = JSON.stringify(data);
              $window.localStorage['daisy'] = JSON.stringify(data[0]);
              // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
              
        
            $http.put("http://161.202.13.188:9000/api/object/update/871",          
            {
              "country": "Singapore",
              "region": "Singapore",
              "city": "Singapore",
              "name": "Luke",
              "objectTypeId": 34,
              "userId": 7,
              "appId": 8,
              "id": 871,
              "balance": data[2].balance + $scope.task.reward,
              "properties":
              [
                {"name": "Luke"},
                {"isParent": false},
                {"availableTasks": $scope.luke.availableTasks},
                {"completedTasks": $scope.luke.completedTasks},
                {"rejectedTasks": $scope.luke.rejectedTasks},
                {"proposedTasks": $scope.luke.proposedTasks}
              ]
            }
            ,config)
            .success(function(data, status) {
              $window.localStorage['luke'] = JSON.stringify(data);
              $state.go('menu.tab.my-tasks',{},{reload:true});
            }).error(function(data, status){
              console.log(data);
            }) 
     }).error(function(data, status){
        console.log(data);
      })
  }).error(function(data, status){
      console.log(data);
    }).finally(function(){
        $ionicLoading.hide();
    });
  
};

    $scope.rejectTask = function()
  {
      $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Rejecting task..'
      });
      var request = {
        "appId": 8,
        "properties": [
            {"isRejected": "true"},
            {"isCompleted": "false"},
            {"rejectMessage": $scope.task.rejectMessage}
        ]
      };
    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",request,config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
        $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
        $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
        var taskToFindDaisy = $filter('filter')($scope.daisy.completedTasks, {id:$scope.task.id})[0];
        var taskToFindLuke = $filter('filter')($scope.luke.completedTasks, {id:$scope.task.id})[0];
        $scope.lukeListIndex = $scope.luke.completedTasks.indexOf(taskToFindLuke);
        $scope.daisyListIndex = $scope.daisy.completedTasks.indexOf(taskToFindDaisy);
        alert($scope.lukeListIndex);
        alert($scope.daisyListIndex);
        $scope.luke.completedTasks.splice($scope.lukeListIndex,1);
        taskToFindLuke.isRejected = "true";
        taskToFindLuke.rejectMessage = $scope.task.rejectMessage;
        taskToFindDaisy.isRejected = "true";
        taskToFindDaisy.rejectMessage = $scope.task.rejectMessage;
        $scope.luke.rejectedTasks.push(taskToFindLuke);
        $scope.daisy.completedTasks.splice($scope.daisyListIndex,1);
        $scope.daisy.rejectedTasks.push(taskToFindDaisy);
        $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
        $window.localStorage['luke'] = JSON.stringify($scope.luke);
        $http.put("http://161.202.13.188:9000/api/object/update/873",
          {
            "country": "Singapore",
            "region": "Singapore",
            "city": "Singapore",
            "name": "Daisy",
            "objectTypeId": 34,
            "userId": 7,
            "appId": 8,
            "id": 873,
            "properties":
            [
              {"name": "Daisy"},
              {"isParent": true},
              {"availableTasks": $scope.daisy.availableTasks},
              {"completedTasks": $scope.daisy.completedTasks},
              {"rejectedTasks": $scope.daisy.rejectedTasks},
              {"proposedTasks": $scope.daisy.proposedTasks}
            ]
          }
          ,config)
        .success(function(response, status) {
            $http.put("http://161.202.13.188:9000/api/object/update/871",
          {
            "country": "Singapore",
            "region": "Singapore",
            "city": "Singapore",
            "name": "Luke",
            "objectTypeId": 34,
            "userId": 7,
            "appId": 8,
            "id": 871,
            "properties":
            [
              {"name": "Luke"},
              {"isParent": false},
              {"availableTasks": $scope.luke.availableTasks},
              {"completedTasks": $scope.luke.completedTasks},
              {"rejectedTasks": $scope.luke.rejectedTasks},
              {"proposedTasks": $scope.luke.proposedTasks}
            ]
          }
              ,config)
            .success(function(data, status) {
               $state.go('menu.tab.my-tasks',{},{reload:true});
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
     

})
.controller('PendingTasksCtrl', function($scope,$window, $state, $ionicLoading ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    var config = { cache: false };
  $scope.activeTab = 1;

  $scope.changeActiveTab = function(tab){
    $scope.activeTab = tab;  
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.detail = function(task){
      $state.go('menu.tab.pending-approval-task-view',{'id' : task.id});
  };
  $scope.viewApproved = function(task){
    $state.go('menu.tab.pending-approval-task-view',{'id' : task.id});
  }

})

.controller('ViewPendingApprovalTaskDetailCtrl', function(TasksCrud, $scope, $stateParams, $window, $http, $filter, $rootScope, $state) {
   var config = { cache: false };
    // get individual task according to ID
    $scope.taskId = $stateParams.id;
    $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
    $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
    $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
    $scope.allProposedTasks = JSON.parse($window.localStorage['daisy']).proposedTasks;
    $scope.task = $filter('filter')($scope.allProposedTasks, {id:$scope.taskId})[0];
    $scope.approveTask = function (){
      var request = {
          "appId": 8,
          "properties": [
              {"isApprovedProposed": "true"},
              {"isAvailable": "true"},
              {"isPending": "false"}
          ]
      };

    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",request,config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
       // var index = $scope.luke.proposedTasks.indexOf(data);

        $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
        $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
        var taskToFindDaisy = $filter('filter')($scope.daisy.proposedTasks, {id:$scope.task.id})[0];
        var taskToFindLuke = $filter('filter')($scope.luke.proposedTasks, {id:$scope.task.id})[0];
        $scope.lukeListIndex = $scope.luke.proposedTasks.indexOf(taskToFindLuke);
        $scope.daisyListIndex = $scope.daisy.proposedTasks.indexOf(taskToFindDaisy);
        alert($scope.lukeListIndex);
        alert($scope.daisyListIndex);
        $scope.luke.proposedTasks.splice($scope.lukeListIndex,1);
        taskToFindLuke.isAvailable = "true";
        taskToFindLuke.isApprovedProposed = "true";
        taskToFindDaisy.isAvailable = "true";
        taskToFindDaisy.isApprovedProposed = "true";
        $scope.luke.availableTasks.push(taskToFindLuke);
        $scope.daisy.proposedTasks.splice($scope.daisyListIndex,1);
        $scope.daisy.availableTasks.push(taskToFindDaisy);
        $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
        $window.localStorage['luke'] = JSON.stringify($scope.luke);
        $http.put("http://161.202.13.188:9000/api/object/update/873",
          
          {
            "country": "Singapore",
            "region": "Singapore",
            "city": "Singapore",
            "name": "Daisy",
            "objectTypeId": 34,
            "userId": 7,
            "appId": 8,
            "id": 873,
            "properties":
            [
              {"name": "Daisy"},
              {"isParent": true},
              {"availableTasks": $scope.daisy.availableTasks},
              {"completedTasks": $scope.daisy.completedTasks},
              {"rejectedTasks": $scope.daisy.rejectedTasks},
              {"proposedTasks": $scope.daisy.proposedTasks}
            ]
          }

            ,config)
        .success(function(response, status) {
            $http.put("http://161.202.13.188:9000/api/object/update/871",          
            {
            "country": "Singapore",
            "region": "Singapore",
            "city": "Singapore",
            "name": "Luke",
            "objectTypeId": 34,
            "userId": 7,
            "appId": 8,
            "id": 871,
            "properties":
            [
              {"name": "Luke"},
              {"isParent": false},
              {"availableTasks": $scope.luke.availableTasks},
              {"completedTasks": $scope.luke.completedTasks},
              {"rejectedTasks": $scope.luke.rejectedTasks},
              {"proposedTasks": $scope.luke.proposedTasks}
            ]
          }
            ,config)
            .success(function(data, status) {
               $state.go('menu.tab.pending-approval-tasks',{},{reload : true});
            }).error(function(data, status){
              console.log(data);
            })      
    }).error(function(data, status){
      console.log(data);
    })
   }).error(function(data, status){
      console.log(data);
    }).finally(function(){
        $ionicLoading.hide();
    });
  };
  $scope.updateTask = function(task)
  {
      $state.go('menu.tab.edit-proposed-task',{'id' : task.id});
  };

    $scope.rejectTask = function()
  {
      $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Rejecting task..'
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
            {startDate: $scope.task.startDate},
            {startTime: $scope.task.startTime},
            {description: $scope.task.description},
            {Average: $scope.task.Average},
            {Good: $scope.task.Good},
            {Excellent: $scope.task.Excellent},
            {isAvailable: "false"},
            {isCompleted: "false"},
            {isProposed: "true"},
            {isApproved: "false"},
            {isPending: "false"},
            {isRejected: "true"},
            {isApprovedProposed: "false"},
            {rejectMessage: $scope.task.rejectMessage},
            {photos: []},
            {assignTo: $scope.task.assignTo}
        ]
      };
    $http.put("http://161.202.13.188:9000/api/object/update/" + $scope.task.id,JSON.stringify($scope.newTask),config)
    .success(function(data, status) {
        $http.get(
          "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
        .success(function(data, status) { 
            $window.localStorage['users'] = JSON.stringify(data);
            $window.localStorage['daisy'] = JSON.stringify(data[0]);
            // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
            $window.localStorage['luke'] = JSON.stringify(data[2]);
            $ionicLoading.hide();
            $state.go('menu.tab.pending-approval-tasks',{},{reload:true});
        }).error(function(data, status){
          $ionicLoading.hide();
          $scope.message = data;
        });
       // window.location.href = 'jiaYong.html#/my-tasks';
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
      $ionicLoading.hide();
    });
  }

})
.controller('EditProposalCtrl', function($scope, $window, $stateParams, $http, $state, $filter, $ionicLoading) {
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;
  console.log($scope.taskId);
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
  $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.allTasks = JSON.parse($window.localStorage['luke']).proposedTasks;
  console.log($scope.allTasks);
  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
  console.log($scope.task);
  // take photo and submit task

  //take photo
   $scope.counterPropose = function(){
     $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Counter-proposing task..'
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
            {startDate: $scope.task.startDate},
            {startTime: $scope.task.startTime},
            {description: $scope.task.description},
            {Average: $scope.task.Average},
            {Good: $scope.task.Good},
            {Excellent: $scope.task.Excellent},
            {isAvailable: "false"},
            {isCompleted: "false"},
            {isProposed: "true"},
            {isApproved: "false"},
            {isPending: "false"},
            {isRejected: "true"},
            {isApprovedProposed: "false"},
            {rejectMessage: $scope.task.rejectMessage},
            {photos: []},
            {assignTo: $scope.task.assignTo}
        ]
      };
    $http.put("http://161.202.13.188:9000/api/object/update/" + $scope.task.id,JSON.stringify($scope.newTask),config)
    .success(function(data, status) {
        $http.get(
          "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
        .success(function(data, status) { 
            $window.localStorage['users'] = JSON.stringify(data);
            $window.localStorage['daisy'] = JSON.stringify(data[0]);
            // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
            $window.localStorage['luke'] = JSON.stringify(data[2]);
            $ionicLoading.hide();
            $state.go('menu.tab.pending-approval-tasks',{},{reload:true});
        }).error(function(data, status){
          $ionicLoading.hide();
          $scope.message = data;
        });
       // window.location.href = 'jiaYong.html#/my-tasks';
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
      $ionicLoading.hide();
    });
   };
  

})
  

.controller('ProfileCtrl', function($scope) {
  var config = { cache: false };
});
