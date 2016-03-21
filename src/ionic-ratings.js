(function() {
  'use strict';
  angular.module('ionic-ratings', ['ionic'])
  .directive('ionicRatings', [ionicRatings]);

  function ionicRatings () {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
      '<span class="icon" ng-click="ratingsClicked(1)" ng-class="{\'read_only\':(readOnly), \'ion-ios-star-outline\': rating < 1, \'ion-ios-star\': rating >= 1}" ></span>' +
      '<span class="icon" ng-click="ratingsClicked(2)" ng-class="{\'read_only\':(readOnly), \'ion-ios-star-outline\': (rating < 1.5), \'ion-ios-star-half\': (rating >= 1.5 && rating < 2), \'ion-ios-star\': rating >= 2}" ></span>' +
      '<span class="icon" ng-click="ratingsClicked(3)" ng-class="{\'read_only\':(readOnly), \'ion-ios-star-outline\': (rating < 2.5), \'ion-ios-star-half\': (rating >= 2.5 && rating < 3), \'ion-ios-star\': rating >= 3}" ></span>' +
      '<span class="icon" ng-click="ratingsClicked(4)" ng-class="{\'read_only\':(readOnly), \'ion-ios-star-outline\': (rating < 3.5), \'ion-ios-star-half\': (rating >= 3.5 && rating < 4), \'ion-ios-star\': rating >= 4}" ></span>' +
      '<span class="icon" ng-click="ratingsClicked(5)" ng-class="{\'read_only\':(readOnly), \'ion-ios-star-outline\': (rating < 4.5), \'ion-ios-star-half\': (rating >= 4.5 && rating < 5), \'ion-ios-star\': rating >= 5}" ></span>' +
      '</div>',
      scope: {
        index: '@',
        ratingsObj: '=ratingsobj'
      },
      link: function(scope, element, attrs) {

        var rating;

        //Setting the default values, if they are not passed
        if (scope.index) {
            rating = scope.ratingsObj[scope.index];
        } else {
            rating = scope.ratingsObj;
        }

        scope.iconOn = rating.iconOn || 'ion-ios-star';
        scope.iconOff = rating.iconOff || 'ion-ios-star-outline';
        scope.iconOnColor = rating.iconOnColor || 'rgb(200, 200, 100)';
        scope.iconOffColor = rating.iconOffColor || 'rgb(200, 100, 100)';
        scope.rating = rating.rating || 1;
        scope.minRating = rating.minRating || 1;
        scope.readOnly = rating.readOnly || false;

        //Setting the color for the icon, when it is active
        scope.iconOnColor = {
          color: scope.iconOnColor
        };

        //Setting the color for the icon, when it is not active
        scope.iconOffColor = {
          color: scope.iconOffColor
        };

        //Setting the rating
        scope.rating = (scope.rating > scope.minRating) ? scope.rating :
            scope.minRating;

        //Setting the previously selected rating
        scope.prevRating = 0;

        //Called when he user clicks on the rating
        scope.ratingsClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          scope.prevRating = val;

          // Call the callback only if it is defined
          if (rating.callback) {
              rating.callback(scope.rating);
          }
        };

        // Only if the passed object is not a list we watch the
        // changes on rating value of ratingObj
        if (!scope.index) {
            scope.$watch('ratingsObj.rating', function(newVal) {
              console.log("New val is " + newVal);
              scope.rating = newVal;
            });
        }
      }
    }
  }

})();
