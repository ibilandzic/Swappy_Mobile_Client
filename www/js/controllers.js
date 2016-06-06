angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('womanCtrl', ['$scope', '$rootScope', 'Item', 'Favorites','Accounts', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $rootScope, Item, Favorites, Accounts, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Woman"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length>0){
                $scope.showItem = true;
                console.log('response not null');
            }
            
            else{
                $scope.message = 'Category is empty';
            }
            
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             //alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              //alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          //alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        $cordovaToast.show("Please log in first!");
    }
        
    };
    
    
    
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };

}])
   
.controller('girlsCtrl',['$scope', '$rootScope', 'Item', 'Favorites','Accounts', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $rootScope, Item, Favorites, Accounts, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Girls"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            
            if ($scope.items.length > 0){
                $scope.showItem = true;
            console.log('response not null');
            }
            
            else{
                $scope.message="This category is empty";
            }
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
            // alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              //alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
         // alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        //$cordovaToast.show("Please log in first!");
    }
        
    };


}])
   
.controller('favoritesCtrl', ['$scope', '$rootScope', 'Item', 'Favorites','Accounts', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $rootScope, Item, Favorites, Accounts, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
    
    $scope.showFavorites = false;
    $scope.message = "Loading ...";
    
    
    if ($rootScope.currentUser) {
       
        console.log('user auth');
        //try fetching favorites by accountId
        
        Favorites.find({"filter":{"where":
        {"accountId":$rootScope.currentUser.id},
        "include":["item"]}})
        .$promise.then(
        function (response) {
            $scope.favorites = response;
            
            if ($scope.favorites.length>0){
                console.log("Favorites fetched");
                $scope.showFavorites = true;
            }
           else{
               $scope.message = "Favorites are empty."
           }
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
    }
    else{
       
        console.log("favorites: not auth");
        $scope.message = "You are not logged in";
    }
   
    
    $scope.deleteFavorite = function(favoriteid) {
        Favorites.deleteById({id: favoriteid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
    
     $scope.sendMail = function(emailId,subject,message){
        console.log("favorites: opening email client");
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
    
  

}])
   
.controller('myAdsCtrl', ['$scope','$state', '$rootScope', 'Item','Favorites', function ($scope,$state, $rootScope, Item, Favorites) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    



    if ($rootScope.currentUser) {
      
      console.log('myads:user auth');
      
       Item.find({"filter":{"where":{
            "accountId": $rootScope.currentUser.id
        }}})
        .$promise.then(
        function (response) {
            
            console.log('User is authenticated');
            $scope.items = response;
            
            if ($scope.items.length == 0){
                $scope.message="No ads found.";
            }
            
            else{
                $scope.showItem = true;
            }
            
            
        },
        function (response) {
            console.log("Error");
            $scope.message = "No ads found.";
        });
    }
    else{
        
        $scope.message = "You are not logged in";
    }


    $scope.deleteItem = function(itemid) {
        
        //destroy item
        Item.deleteById({id: itemid});
        console.log("Item deleted");
   
         Favorites.find({"filter":{"where":{"itemId": itemid}}}).$promise.then(function(response){
            
                $scope.favs = response;
                
                if ($scope.favs.length>0){
                    for (var i=0; i<$scope.favs.length;i++){
                        Favorites.deleteById({id:$scope.favs[i].id});
                        console.log("Fav deleted");
                    }
                }
                else ("Fav array is empty");
                $state.go($state.current, {}, {reload: true});
            
        },function(response){
            
        });
        //$state.go($state.current, {}, {reload: true});
    };
    
  
   
}])
   
.controller('manCtrl', ['$scope', '$rootScope', 'Item', 'Favorites','Accounts', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $rootScope, Item, Favorites, Accounts, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Man"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length > 0){
                $scope.showItem = true;
                console.log('response not null');
            }
            
            else{
                $scope.message = 'Category is empty';
            }
            
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             //alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              //alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          //alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        $cordovaToast.show("Please log in first!");
    }
        
    };
    
    
    
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
    
}])
   
.controller('boysCtrl', ['$scope', '$rootScope', 'Item', 'Favorites','Accounts', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $rootScope, Item, Favorites, Accounts, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Boys"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length>0){
                $scope.showItem = true;
                console.log('response not null');
            }
            
            else{
                $scope.message = 'Category is empty';
            }
            
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             //alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              //alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          //alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        $cordovaToast.show("Please log in first!");
    }
        
    };
    
    
    
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
    
}])
      
.controller('loginCtrl', ['$scope', '$rootScope','Accounts','AuthService', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast','$localStorage', function ($scope, $rootScope, Accounts, AuthService, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast,$localStorage) { 

    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.reservation = {};
    $scope.registration={
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    username: "",
    password:"",
    email: ""
   
  };
    $scope.loggedIn = false;
    
    if(AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
    }
    
    

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        AuthService.login($scope.loginData);
        console.log("login data sent");
        
    };
    
    $scope.logOut = function() {
       AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        console.log("Log out succ");
    };
      
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
    

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
        console.log('Doing registration', $scope.registration);
        $scope.loginData.username = $scope.registration.username;
        $scope.loginData.password = $scope.registration.password;

        AuthService.register($scope.registration);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
       
    };
    
     $scope.createNewAccount = function(){
    
    console.log('entering function');
    $scope.accounts = Accounts.find({"filter": {
                    "where": {"username": $scope.registration.username}}});
    
    if ($scope.accounts.length > 0) {
        
        console.log('account exists');
        $cordovaToast.show("Account already exists");
        
        return;
        }
        
    else{
        Accounts.create($scope.registration).$promise
            .then(function(response){
            console.log("account created");
           // $cordovaToast.show("Account succesfuly created!");        
            
        }, function(response){
            $cordovaToast.show("Problem while creating new account!");
            
        });
        
         $scope.registration={
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
            image: "",
            realm: "",
            username: "",
            password:"",
            email: ""
   
            };
            
       
        
    }
    
    }
       
    $rootScope.$on('registration:Successful', function () {
        $localStorage.storeObject('userinfo',$scope.loginData);
    });
}])
   
.controller('signupCtrl', function($scope) {

})
   
.controller('newAdCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Item','ItemType','ItemSize','Item_state','Accounts','Favorites','$window', function ($scope, $rootScope, $state, $stateParams, Item,ItemType,ItemSize,Item_state,Accounts,Favorites,$window) {
    
   $scope.allSizes={};
   $scope.allTypes;
   $scope.allStates={};
   $scope.showForm=false;
   $scope.message ="Loading ...";
    $scope.form={};
   
  if ($rootScope.currentUser) {
      
      console.log('user auth');
        $scope.showForm = true;
        
        //dodano je nije dobro u favorites controleru
        $scope.account = Accounts.findById({id: $rootScope.currentUser.id});
    }
    else{
        
        $scope.message = "You are not logged in";
    }
   
    
    ItemType.find()
        .$promise
            .then(function(response){
                //got all item types
                $scope.allTypes = response;
               
            },
            function(response){
                //if response is blank, get default
                $scope.showForm = false;
                console.log("Unable to fetch item types");
                $scope.message = "Unable to fetch item type data. Try again later.";
                
            });
            
            
    ItemSize.find()
        .$promise
            .then(function(response){
                $scope.allSizes = response;
               
            },function(response){
                $scope.allSizes = "EUR M";
                 
            });
            
    
    Item_state.find()
        .$promise
            .then(function(response){
                $scope.allStates = response;
                $scope.stateAvailable=true;
            },function(response){
                $scope.allStates = "Good";
                 
            });
    
    
    
    $scope.newItem = {
        name: "",
        descr: "",
        type:"",
        size:"EUR ",
        state:"Good",
        gender:"Female",
        category:"Woman",
        accountId:"",
        contact:""
    };

    $scope.submitItem = function () {
        
        
        $scope.newItem.accountId = $rootScope.currentUser.id;
        $scope.newItem.contact = $scope.account.email;
        

        Item.create($scope.newItem);
        console.log('new item created');

        
        $scope.form.itemForm.$setPristine();
        
        $state.go($state.current, {}, {reload: true});
        
        $scope.newItem = {
        name: "",
        descr: "",
        type:"",
        size:"",
        state:"",
        gender:"",
        category:"",
        accountId:""
    };
       
     
       
    }
}])

 