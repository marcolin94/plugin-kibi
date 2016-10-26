module.exports = function(kibana) {
  //descrive le estensioni che voglio mettere nell'interfaccia

  return new kibana.Plugin({
    uiExports: {
      //Aggiungo il plugin con il nome che decido

      visTypes: [ 'plugins/clock_vis/clock' ]
    }
  });
};
