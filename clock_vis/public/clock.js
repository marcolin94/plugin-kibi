define(function(require) {

  //include css
  require('plugins/clock_vis/clock.css');

  //Angular module per il plugin
  var module = require('ui/modules').get('clock_vis');
  //Controller per il module
  	module.controller('ClockController', function($scope, $timeout) {

  		var setTime = function() {
  			$scope.time = Date.now();
  			$timeout(setTime, 1000);
  		};
  		setTime();

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
