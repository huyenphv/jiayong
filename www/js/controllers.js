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

.controller('MyTasksCtrl', function($scope, $localstorage,$window, $state, $ionicLoading) {
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
})

.controller('ViewMyTaskDetailCtrl', function($scope, $filter, $localstorage,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;

  $scope.allTasks = JSON.parse($window.localStorage['tasks']);

  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
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
})

.controller('CreateTaskCtrl', function($scope, $state, $window, $localstorage, $http,$ionicLoading, $rootScope) {
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
            var ctime = new Date();
            if (typeof $scope.task.startTime !== 'undefined' && $scope.task.startTime != '') {
              ctime.setTime($scope.task.time_in_ms);
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
          //      $scope.event.time = dateTime.toTimeString();
                $scope.task.time_in_ms = dateTime.getTime();
                dateTime.setSeconds(0);
                var realDateTime = new Date(dateTime);
                realDateTime = realDateTime.toTimeString();
                realDateTime = realDateTime.substring(0,realDateTime.indexOf("GMT"));
                $scope.task.startTime = realDateTime;
               // $scope.event.time_formated = $scope.event.time.substr(0,5);
                document.getElementById('time').value = $scope.task.startTime;
              }
            );

        } else {
            $scope.message = 'Time Picker is not available. Are you on browser?';
        }
    };

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
            {isAvailable: true},
            {isCompleted: false},
            {isProposed: false},
            {isApproved: false},
            {photos: []},
            {assignTo: $scope.task.assignTo}
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
       $localstorage.setObject('newTaskId',data.id);
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
           $state.go('menu.tab.my-tasks',null,{reload:true});
        }).error(function(data, status){
          console.log(data);
        }).finally(function(){
          $ionicLoading.hide();
        });
      }).error(function(data, status){
        console.log(data);
      });
       // window.location.href = 'jiaYong.html#/my-tasks';
    }).error(function(data, status){
      console.log(data);
    });
    
    // $scope.newTaskId = $localstorage.getObject('newTaskId',0);
    // alert($scope.newTaskId);
    // $http.post("http://161.202.13.188:9000/api/object/871/relationship/add/"+$scope.newTaskId,
    //   {
        
    //     "appId": 8,
    //     "propertyName": "availableTasks"

    //   },config)
    // .success(function(data, status) {
    //   console.log(data);
    // }).error(function(data, status){
    //   console.log(data);
    // });

    // $http.post("http://161.202.13.188:9000/api/object/873/relationship/add/"+ $scope.newTaskId,
    //   {
    //     "appId": 8,
    //     "propertyName": "availableTasks"        
      
    // },config)
    // .success(function(data, status) {
    //    console.log("success");
    //    $window.location.href = 'jiaYong.html#/my-tasks';
    // }).error(function(data, status){
    //   console.log(data);
    // }).finally(function(){
    //   $ionicLoading.hide();
    // });
  };
})

.controller('ManageTaskCtrl', function($scope, $state, $filter, $stateParams, $window, $localstorage, $http,$ionicLoading, $rootScope) {
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
            {isAvailable: true},
            {isCompleted: false},
            {isProposed: false},
            {isApproved: false},
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
    
    // $scope.newTaskId = $localstorage.getObject('newTaskId',0);
    // alert($scope.newTaskId);
    // $http.post("http://161.202.13.188:9000/api/object/871/relationship/add/"+$scope.newTaskId,
    //   {
        
    //     "appId": 8,
    //     "propertyName": "availableTasks"

    //   },config)
    // .success(function(data, status) {
    //   console.log(data);
    // }).error(function(data, status){
    //   console.log(data);
    // });

    // $http.post("http://161.202.13.188:9000/api/object/873/relationship/add/"+ $scope.newTaskId,
    //   {
    //     "appId": 8,
    //     "propertyName": "availableTasks"        
      
    // },config)
    // .success(function(data, status) {
    //    console.log("success");
    //    $window.location.href = 'jiaYong.html#/my-tasks';
    // }).error(function(data, status){
    //   console.log(data);
    // }).finally(function(){
    //   $ionicLoading.hide();
    // });
  };
})

.controller('PendingTasksCtrl', function($scope, $localstorage,$window, $state, $ionicLoading ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var config = { cache: false };
  $scope.currentUser = JSON.parse($window.localStorage.getItem("daisy"));
  

})

.controller('TaskDetailCtrl', function($scope, $stateParams) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ProfileCtrl', function($scope) {
  var config = { cache: false };
  $scope.settings = {
    enableFriends: true
  };
});
