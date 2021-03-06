angular.module('jiaYongAppChild.controllers', [])
/* @screen: Logout of the app */
.controller('LogoutCtrl', function(
$scope, $http, $ionicModal, $ionicActionSheet, $ionicLoading, $window)
{
  $scope.tryLogout = function(){
    var config = { cache: false };
    
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Logging out..'
    });

    // $http.post("http://161.202.13.188:9000/user/logout",config)
    // .success(function(data, status) {
       window.localStorage.removeItem('currentUser');
       window.location.href = 'index.html#/login';
    // }).error(function(data, status){
    //   console.log(data);
    // }).finally(function(){
      $ionicLoading.hide();
    // });
  };

  $scope.tryLogout();
})

.controller('MyTasksCtrl', function($scope, $state, $ionicPopup, $window, $http,$ionicLoading, $rootScope) {
  var config = { cache: false };
  $scope.activeTab = 1;
  $scope.refresh = function(){
   var alertPopup = $ionicPopup.alert({
     title: 'New Notification',
     template: '<center>A new change has been made! Refreshing the application...</center>'
   });
   alertPopup.then(function(res) {
      $http.get(
      "http://161.202.13.188:9000" + "/api/object/get/app/8/objecttype/34",config)
    .success(function(data, status) { 
        $window.localStorage['users'] = JSON.stringify(data);
        $window.localStorage['daisy'] = JSON.stringify(data[0]);
        // $ionicLoading.hide();
        // $window.localStorage['currentUser'] = JSON.stringify(data);
        // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
        $window.localStorage['luke'] = JSON.stringify(data[2]);
        $state.go('menu.tab.my-tasks',{},{reload:true});
        $ionicLoading.hide();
    }).error(function(data, status){
      $ionicLoading.hide();
      $scope.message = data;
    }); 
     $scope.$broadcast('scroll.refreshComplete');
   });
    
  }
  $scope.changeActiveTab = function(tab){
    $scope.activeTab = tab;  
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("luke"));
    //detail view
  $scope.detail = function(event){
      $state.go('menu.tab.view-my-task',{'id' : event.id});
  };

  $scope.viewCompleted = function(task){
      $state.go('menu.tab.view-my-task',{'id' : task.id});
  }

  $scope.viewRejected = function(task){
      $state.go('menu.tab.view-my-task',{'id' : task.id});
  }
})

.controller('ProposeTaskCtrl', function($scope, $state, $ionicPopup, $window, $http,$ionicLoading, $rootScope) {
  //$scope.chat = Chats.get($stateParams.chatId);

  // to propose a task, idk is this correct though lol
  var config = { cache: false };
  var self = this;
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
   $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
   console.log($scope.luke);
  $scope.task =
  {
    country: "Singapore",
    region: "Singapore",
    city: "Singapore",
    name: "",
    objectTypeId: 35,
    userId: 7,
    appId: 8,
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

    if ($scope.currentUser.name == "Luke")
    {
      $scope.contacts = 
      [ {name : "Mom",
          id : 873
        },
        {name : "Ben",
          id : 872
        }

      ];
    };
    
    $scope.propose = function(){
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
        userId: 7,
        appId: 8,
        properties: [
            {name: $scope.task.name},
            {startDate: $scope.task.startDate},
            {startTime: $scope.task.startTime},
            {description: $scope.task.description},
            {Average: $scope.task.averageAmount},
            {Good: $scope.task.goodAmount},
            {Excellent: $scope.task.excellentAmount},
            {isAvailable: "false"},
            {isCompleted: "false"},
            {isProposed: "true"},
            {isApproved: "false"},
            {isApprovedProposed: "false"},
            {isRejected: "false"},
            {rejectedMessage: ""},
            {reward: 0},
            {isPending: "true"},
            {photos: []},
            {assignTo: $scope.task.assignTo}
        ]
      };
    $http.post("http://161.202.13.188:9000/api/object/create",JSON.stringify($scope.newTask),config)
    .success(function(data, status) {
       $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
       $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
       $scope.daisy.proposedTasks.push(data);
       $scope.luke.proposedTasks.push(data);
       $window.localStorage['daisy'] = JSON.stringify($scope.daisy);
       $window.localStorage['luke'] = JSON.stringify($scope.luke);
       $http.post("http://161.202.13.188:9000/api/object/871/relationship/add/"+data.id,
        {
          
          "appId": 8,
          "propertyName": "proposedTasks"

        },config)
      .success(function(response, status) {
        $http.post("http://161.202.13.188:9000/api/object/873/relationship/add/"+ data.id,
          {
            "appId": 8,
            "propertyName": "proposedTasks"        
          
        },config)
        .success(function(data, status) {
           $state.go('menu.tab.my-propose-task',{},{reload:true});
        }).error(function(data, status){
          console.log(data);
        });
      }).error(function(data, status){
        console.log(data);
      });
       // window.location.href = 'jiaYong.html#/my-tasks';
    }).error(function(data, status){
      console.log(data);
    }).finally(function(){
      $ionicLoading.hide();
    });
  };

})

.controller('MyProposedTasksCtrl', function($scope, $ionicPopup, $http, $stateParams,$ionicLoading, $window, $state) {
  var config = { cache: false };
  $scope.activeTab = 1;
  
  $scope.refresh = function(){
   var alertPopup = $ionicPopup.alert({
     title: 'New Notification',
     template: '<center>A new change has been made! Refreshing the application...</center>'
   });
   alertPopup.then(function(res) {
      $http.get(
      "http://161.202.13.188:9000" + "/api/object/get/app/8/objecttype/34",config)
    .success(function(data, status) { 
        $window.localStorage['users'] = JSON.stringify(data);
        $window.localStorage['daisy'] = JSON.stringify(data[0]);
        // $ionicLoading.hide();
        // $window.localStorage['currentUser'] = JSON.stringify(data);
        // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
        $window.localStorage['luke'] = JSON.stringify(data[2]);
        $state.go('menu.tab.my-propose-task',{},{reload:true});
        $ionicLoading.hide();
    }).error(function(data, status){
      $ionicLoading.hide();
      $scope.message = data;
    }); 
     $scope.$broadcast('scroll.refreshComplete');
   });
    
  }
  $scope.currentUser = JSON.parse($window.localStorage['luke']);

  $scope.changeActiveTab = function(tab){
    $scope.activeTab = tab;  
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("luke"));
  console.log($scope.currentUser);
  $scope.viewPending = function(task) {
      $state.go('menu.tab.view-pending-proposed-task',{'id' : task.id});
  };
  $scope.viewRejected = function(task) {
      $state.go('menu.tab.view-pending-proposed-task',{'id' : task.id});
  }
})

.controller('ViewMyProposedTaskDetailCtrl', function($rootScope, $http, $scope, $ionicActionSheet, $filter,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;
  console.log($scope.taskId);
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
  $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.allTasks = JSON.parse($window.localStorage['luke']).proposedTasks;
  console.log($scope.allTasks);
  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
  if (typeof $scope.task === "undefined"){
      $scope.allTasks = JSON.parse($window.localStorage['luke']).availableTasks;
      console.log($scope.allTasks);
      $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
      if (typeof $scope.task === "undefined"){
        $scope.allTasks = JSON.parse($window.localStorage['luke']).rejectedTasks;
        $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
      }
  }
  $scope.users = JSON.parse($window.localStorage.getItem("users"));
  $scope.submitToUser = $filter('filter')($scope.users, {id:$scope.task.assignTo})[0];
  $scope.goRepropose = function() {
      $state.go('menu.tab.edit-proposed-task',{'id' : $scope.task.id});
  }
  $scope.acceptProposal = function() {
      $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Accepting proposed task..'
      });
      var request = {
          appId: 8,
          properties: [
              {isApprovedProposed: "true"},
              {isAvailable: "true"},
              {isRejected: "false"},
              {rejectedMessage: $scope.task.rejectedMessage},
              {isPending: "false"}
          ]
      };

    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
       // var index = $scope.luke.proposedTasks.indexOf(data);

        $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
        $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
        var taskToFindDaisy = $filter('filter')($scope.daisy.proposedTasks, {id:$scope.task.id})[0];
        var taskToFindLuke = $filter('filter')($scope.luke.proposedTasks, {id:$scope.task.id})[0];
        $scope.lukeListIndex = $scope.luke.proposedTasks.indexOf(taskToFindLuke);
        $scope.daisyListIndex = $scope.daisy.proposedTasks.indexOf(taskToFindDaisy);
        // alert($scope.lukeListIndex);
        // alert($scope.daisyListIndex);
        $scope.luke.proposedTasks.splice($scope.lukeListIndex,1);
        taskToFindLuke.isAvailable = "true";
        taskToFindLuke.isApprovedProposed = "true";
        taskToFindLuke.isRejected = "false";
        taskToFindLuke.isPending = "false";
        taskToFindLuke.rejectedMessage = $scope.luke.rejectedMessage;
        taskToFindDaisy.isAvailable = "true";
        taskToFindDaisy.isApprovedProposed = "true";
        taskToFindDaisy.isRejected = "false";
        taskToFindDaisy.isPending = "false";
        taskToFindDaisy.rejectedMessage = $scope.daisy.rejectedMessage;
        $scope.luke.availableTasks.push(taskToFindLuke);
        // $scope.daisy.proposedTasks.splice($scope.daisyListIndex,1);
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
              {"proposedTasks": $scope.daisy.proposedTasks},
              {"balance": $scope.daisy.balance}
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
              {"proposedTasks": $scope.luke.proposedTasks},
              {"balance": $scope.luke.balance}
            ]
          }
            ,config)
            .success(function(data, status) {
               $state.go('menu.tab.my-tasks',{},{reload : true});
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
})

.controller('ProfileCtrl', function($scope, $window, $ionicPopup, $http, $state, $ionicLoading) {
  var config = { cache: false };
  $scope.currentUser = JSON.parse($window.localStorage.getItem("luke"));
  $scope.refresh = function(){
   var alertPopup = $ionicPopup.alert({
     title: 'New Notification',
     template: '<center>A new change has been made! Refreshing the application...</center>'
   });
   alertPopup.then(function(res) {
      $http.get(
      "http://161.202.13.188:9000" + "/api/object/get/app/8/objecttype/34",config)
    .success(function(data, status) { 
        $window.localStorage['users'] = JSON.stringify(data);
        $window.localStorage['daisy'] = JSON.stringify(data[0]);
        // $ionicLoading.hide();
        // $window.localStorage['currentUser'] = JSON.stringify(data);
        // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
        $window.localStorage['luke'] = JSON.stringify(data[2]);
        $state.go('menu.tab.profile',{},{reload:true});
        $ionicLoading.hide();
    }).error(function(data, status){
      $ionicLoading.hide();
      $scope.message = data;
    }); 
     $scope.$broadcast('scroll.refreshComplete');
   });
    
  }
  $scope.currentUser = JSON.parse($window.localStorage.getItem("luke"));
})


.controller('ViewMyTaskDetailCtrl', function($rootScope, $ionicPopup, $ionicModal, $http, $scope, $ionicActionSheet, $filter,$window, $state, $ionicLoading, $stateParams){
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;
  console.log($scope.taskId);
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
  $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.allTasks = JSON.parse($window.localStorage['luke']).availableTasks;
  console.log($scope.allTasks);
  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
  console.log('task');
  console.log($scope.task);
  if (typeof $scope.task === "undefined")
  {
      $scope.allTasks = JSON.parse($window.localStorage['luke']).completedTasks;
      console.log($scope.allTasks);
      $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
      if (typeof $scope.task === "undefined") 
      {
        $scope.allTasks = JSON.parse($window.localStorage['luke']).rejectedTasks;
        console.log($scope.allTasks);
        $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
      }
      
  }
  $scope.showSink = true;
  $scope.switchImage = function()
  {
      $scope.showSink = !$scope.showSink;
  }
  // var today = new Date();
  // var taskStartDate = new Date("2006/01/01");
  // alert(taskStartDate);

  //take photo
   $scope.takeUpTask = function(){
      var year = $scope.task.startDate.substr($scope.task.startDate.length - 4,4);
      var month = "" + (parseInt($scope.task.startDate.substr(3,2))- 1);
      var date = $scope.task.startDate.substr(0,2);
      var hour = $scope.task.startTime.substr(0,2) ;
      var min = $scope.task.startTime.substr(3,2);
      var dateTime = new Date(year,month,date,hour,min,"00","00");
      if(dateTime > new Date()){
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: '<center>Cannot take up a task in a future date!</center>'
         });
         alertPopup.then(function(res) {
           $scope.$broadcast('scroll.refreshComplete');
         });
      }else
      {
        
        $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Tasking up task..'
        });
        console.log($scope.task.isAvailable);
        var request = {
              appId: 8,
              properties: [
                  {isAvailable: "false"}
              ]
          };

        $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
        .success(function(data, status) {
          $http.get(
            "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
          .success(function(data, status) { 
              $window.localStorage['users'] = JSON.stringify(data);
              $window.localStorage['daisy'] = JSON.stringify(data[0]);
              // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
              $window.localStorage['luke'] = JSON.stringify(data[2]);
              $state.go('menu.tab.my-tasks',{},{reload:true});
          }).error(function(data, status){
            $ionicLoading.hide();
            $scope.message = data;
          }).finally(function(){
          $ionicLoading.hide();
      });
          
     }).error(function(data, status){
        console.log(data);
      }).finally(function(){
          $ionicLoading.hide();
      });
    }
   };

   $scope.picChange = function(evt){ 
    //bring selected photo in
    //get files captured through input
      var fileInput = evt.target.files;
      if(fileInput.length>0){
      //get the file
        //window url 
        var windowURL = window.URL || window.webkitURL; 
        //picture url
        var picURL = windowURL.createObjectURL(fileInput[0]);

        //get canvas
        var photoCanvas = document.getElementById("capturedPhoto");
        var ctx = photoCanvas.getContext("2d");
        $scope.image = picURL;
        //release object url
        windowURL.revokeObjectURL(picURL);
      }
    };

   // $scope.openCameraActionSheet = function(){
   //      var hideSheet = $ionicActionSheet.show({
   //        buttons: [
   //          { text: 'Use Camera' },
   //          { text: 'Choose Photo' }
   //        ],
   //        cancelText: 'Cancel',
   //        cancel: function() {
   //        },
   //        buttonClicked: function(index) {
   //          var source = 0;
   //          var errorCallback = function(e) {
   //            console.log('Reeeejected!', e);
   //          };

   //          // Not showing vendor prefixes.
   //          navigator.getUserMedia({video: true}, function(localMediaStream) {
   //            var video = document.querySelector('video');
   //            video.src = window.URL.createObjectURL(localMediaStream);

   //            // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
   //            // See crbug.com/110938.
   //            video.onloadedmetadata = function(e) {
   //              // Ready to go. Do some stuff.
   //            };
   //          }, errorCallback);
   //          var hasGetUserMedia = function() {
   //            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
   //                      navigator.mozGetUserMedia || navigator.msGetUserMedia);
   //          }

   //          if (hasGetUserMedia()) {
   //            // Good to go!
   //            alert('yo');
   //          } else {
   //            alert('getUserMedia() is not supported in your browser');
   //          };

   //      if (navigator.camera) {
   //        if (index == 0) {
   //          source = navigator.camera.PictureSourceType.CAMERA;
   //        } else if (index == 1) {
   //          source = navigator.camera.PictureSourceType.PHOTOLIBRARY || 0;
   //        } else {
   //          alert("no navigator found!");
   //        }

   //        var config = {
   //          quality: 75,
   //          sourceType: source,
   //          encodingType: navigator.camera.EncodingType.PNG,
   //          destinationType: navigator.camera.DestinationType.DATA_URL,
   //          correctOrientation: true,
   //          allowEdit: true,
   //          saveToPhotoAlbum: true
   //        };

   //        navigator.camera.getPicture(

   //          function(imageURI) {

   //            $scope.task.photos.push(imageURI);
   //            // alert(imageURI);
             
   //          }, function(err) {
   //            console.err(err);
   //          },
   //          config);
   //      } else {
   //        $rootScope.message = 'Unable to access camera. Are you on browser?';
   //      }

   //      return true;
   //    }
   //  });
   // / };

    $ionicModal.fromTemplateUrl('templates/modal-event-photo.html', function($ionicModal) {
        $scope.modalPhoto = $ionicModal;
    }, { 
        scope: $scope,
        focusFirstInput: false,
        animation: 'slide-in-up'
    });

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
    // //remove the selected photo
    // $scope.removePhoto = function($index){
    //   $scope.copyOfPhotos.splice($index,1);
    // };
    //remove the photo from actual array
    //reset the copy to blank
    $scope.donePhotoEdit = function(){
      $scope.modalPhoto.hide();
      $scope.task.photos = $scope.copyOfPhotos;
      $scope.copyOfPhotos = {};

    };

    $scope.withdrawTask = function(){
        
        $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Withdrawing up task..'
        });
        var request = {
              appId: 8,
              properties: [
                  {isAvailable: "true"}
              ]
          };

        $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
        .success(function(data, status) {
          $http.get(
            "http://161.202.13.188:9000/api/object/get/app/8/objecttype/34",config)
          .success(function(data, status) { 
              $window.localStorage['users'] = JSON.stringify(data);
              $window.localStorage['daisy'] = JSON.stringify(data[0]);
              // $window.localStorage['avail'] = JSON.stringify(data[0].availabTasks);
              $window.localStorage['luke'] = JSON.stringify(data[2]);
              $state.go('menu.tab.my-tasks',{},{reload:true});
          }).error(function(data, status){
            $ionicLoading.hide();
            $scope.message = data;
          }).finally(function(){
          $ionicLoading.hide();
      });
          
     }).error(function(data, status){
        console.log(data);
      }).finally(function(){
          $ionicLoading.hide();
      });
    
    };

   $scope.completeTask = function(){
      $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Completing task..'
      });
      var request = {
            appId: 8,
            properties: [
                {isCompleted: "true"},
                {isPending: "true"}
            ]
        };
      $scope.task.isAvailable = "false";
    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
        $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
        $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
        var taskToFindDaisy = $filter('filter')($scope.daisy.availableTasks, {id:$scope.task.id})[0];
        var taskToFindLuke = $filter('filter')($scope.luke.availableTasks, {id:$scope.task.id})[0];
        $scope.lukeListIndex = $scope.luke.availableTasks.indexOf(taskToFindLuke);
        $scope.daisyListIndex = $scope.daisy.availableTasks.indexOf(taskToFindDaisy);
        // alert($scope.lukeListIndex);
        // alert($scope.daisyListIndex);
        $scope.luke.availableTasks.splice($scope.lukeListIndex,1);
        console.log($scope.luke.availableTasks);
        taskToFindLuke.isCompleted = "true";
        taskToFindLuke.isPending = "true";
        taskToFindDaisy.isCompleted = "true";
        taskToFindDaisy.isPending = "true";
        $scope.luke.completedTasks.push(taskToFindLuke);
        $scope.daisy.availableTasks.splice($scope.daisyListIndex,1);
        console.log($scope.daisy.availableTasks);
        $scope.daisy.completedTasks.push(taskToFindDaisy);
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
              {"proposedTasks": $scope.daisy.proposedTasks},
              {"balance": 0}
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
              {"proposedTasks": $scope.luke.proposedTasks},
              {"balance": $scope.luke.balance}
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


  $scope.redoTask = function(){
    // retake photos and submit the task for approval again
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Updating task..'
    });
    var request = {
        appId: 8,
        properties: [
            {isCompleted: "false"},
            {isAvailable: "false"},
            {isRejected: "false"},
            {rejectedMessage: $scope.task.rejectedMessage}
        ]
    };
    $http.put("http://161.202.13.188:9000/api/object/" + $scope.task.id + "/update/properties",JSON.stringify(request),config)
    .success(function(data, status) {
       // $scope.allAvailableTasks.push(data);
        $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
        $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
        var taskToFindDaisy = $filter('filter')($scope.daisy.rejectedTasks, {id:$scope.task.id})[0];
        var taskToFindLuke = $filter('filter')($scope.luke.rejectedTasks, {id:$scope.task.id})[0];
        $scope.lukeListIndex = $scope.luke.rejectedTasks.indexOf(taskToFindLuke);
        $scope.daisyListIndex = $scope.daisy.rejectedTasks.indexOf(taskToFindDaisy);
        // alert($scope.lukeListIndex);
        // alert($scope.daisyListIndex);
        $scope.luke.rejectedTasks.splice($scope.lukeListIndex,1);
        console.log($scope.luke.availableTasks);
        taskToFindLuke.isRejected = "false";
        taskToFindLuke.isCompleted = "false";
        taskToFindLuke.isAvailable = "false";
        taskToFindLuke.rejectedMessage = $scope.task.rejectedMessage;
        taskToFindDaisy.isRejected = "false";
        taskToFindDaisy.isCompleted = "false";
        taskToFindDaisy.isAvailable = "false";
        taskToFindDaisy.rejectedMessage = $scope.task.rejectedMessage;
        $scope.luke.availableTasks.push(taskToFindLuke);
        $scope.daisy.rejectedTasks.splice($scope.daisyListIndex,1);
        console.log($scope.daisy.availableTasks);
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
              {"proposedTasks": $scope.daisy.proposedTasks},
              {"balance": $scope.daisy.balance}
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
              {"proposedTasks": $scope.luke.proposedTasks},
              {"proposedTasks": $scope.luke.balance}
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
  }
})

.controller('EditProposalCtrl', function($scope, $window, $http, $ionicLoading, $state, $stateParams, $filter) {
  var config = { cache: false };
  // get individual task according to ID
  $scope.taskId = $stateParams.id;
  console.log($scope.taskId);
  $scope.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
  $scope.users = JSON.parse($window.localStorage.getItem("users"));
  $scope.luke = JSON.parse($window.localStorage.getItem("luke"));
  $scope.daisy = JSON.parse($window.localStorage.getItem("daisy"));
  $scope.allTasks = JSON.parse($window.localStorage['luke']).proposedTasks;
  console.log($scope.allTasks);
  $scope.task = $filter('filter')($scope.allTasks, {id:$scope.taskId})[0];
  console.log($scope.task);
  $scope.submitToUser = $filter('filter')($scope.users, {id:$scope.task.assignTo})[0];
  // take photo and submit task

  //take photo
   $scope.rePropose = function(){
     $ionicLoading.show({
          template: '<i class="icon ion-loading-c"></i> Reproposing task..'
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
            {isAvailable: "false"},
            {isCompleted: "false"},
            {isProposed: "true"},
            {isApproved: "false"},
            {isApprovedProposed: "false"},
            {isRejected: "false"},
            {rejectedMessage: ""},
            {reward: 0},
            {isPending: "true"},
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
            $state.go('menu.tab.my-propose-task',{},{reload:true});
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
  

});



