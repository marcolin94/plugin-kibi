define(function(require) {

  //include css
  require('plugins/clock_vis/clock.css');

  //Angular module per il plugin
  var module = require('ui/modules').get('clock_vis');

  module.run(function($rootScope) {
    var init = function () {
      $rootScope.flag = true;
      $rootScope.timeAdd= new Date();
      $rootScope.time = new Date();
      $rootScope.number_pass = 0;
    };
    init();

  });

  //Controller per il module
	module.controller('ClockController', function($scope, $timeout, $rootScope) {

    var select;

		var setTime = function() {
      if($rootScope.flag== undefined || $rootScope.flag){
        $rootScope.time = Date.now();
        $timeout(setTime, 1000);
      }
		};
    setTime();

    $scope.changeFlag = function(flag){
      $rootScope.flag= flag;
      setTime();
    };

    $scope.addDays = function(addDays){
      $rootScope.timeAdd.setDate($rootScope.timeAdd.getDate() + addDays);
    };

    $scope.getSelectOption = function(selectOption){
      select = selectOption;
    };

    $scope.add = function(add){

      switch(select){
        case "dd":
            $rootScope.timeAdd.setDate($rootScope.timeAdd.getDate() + add);
          break;

        case "mm":
            $rootScope.timeAdd.setMonth($rootScope.timeAdd.getMonth() + add);
          break;

        case "yy":
            $rootScope.timeAdd.setYear($rootScope.timeAdd.getYear() + add);
          break;
      }
      $rootScope.timeAdd.setMonth($rootScope.timeAdd.getMonth() + addDays);
    };

    $scope.muoseOver = function (){
      $rootScope.number_pass = $rootScope.number_pass + 1;
    };
  });

  //the provider that return the visualization
  function ClockProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    return new TemplateVisType({
      name: 'trClock', //Id of visualization
      title: 'Clock', //the name of list
      icon: 'fa-clock-o', //font icon - C'è un sito con su tutte le icone dispobili http://fontawesome.io/icons/
      description: 'Add a digital clock to your dashboards.', // description shown to the user
      requiresSearch: false, // Cannot be linked to a search
      template: require('plugins/clock_vis/clock.html'), // Load the template of the visualization
      params: {
        editor: require('plugins/clock_vis/clock-editor.html'),
        defaults:{
          format:'HH:mm:ss'
        }
      }
    });
  }

  require('ui/registry/vis_types').register(ClockProvider);

  return ClockProvider;
});
