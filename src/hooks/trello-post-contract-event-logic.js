
const mqtt = require('../middleware/mqtt_wrapper');
const trello = require('../middleware/trello_wrapper');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
    console.log("running trello contract event logic..");
    
    var contract = await context.app
        .service('contract')
        .get(context.data.contract_id);

    var percentDone = await trello.getPercentDone(context.app);

    if (percentDone==0) {
        console.log("contract-event: locking");
        mqtt.send(context.app, "lock", contract.box_id); 
    }
    else if (percentDone>=1) {
        console.log("contract-event: unlocking");
        mqtt.send(context.app, "unlock", contract.box_id);    
    }
    else {
        var peMessage = "pe" + ("" + parseFloat(percentDone).toFixed(2)).substring(2);
        console.log(percentDone*100); 
        console.log("contract-event: " + peMessage); 
        mqtt.send(context.app, peMessage, contract.box_id);    
    }

    // Best practice: hooks should always return the context
    return context;
  };
};
