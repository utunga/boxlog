
const mqtt = require('../middleware/mqtt_wrapper');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
    console.log("running contract event logic..");

    // how many events for this particular contract?
    var events = await context.app
        .service('contract-event')
        .find({query: {
                contract_id: context.data.contract_id,
                $limit: 0 // $limit==0 makes this a faster/count query
              }});
    console.log(events);
    console.log(context.data.contract_id);
    
    var contract = await context.app
        .service('contract')
        .get(context.data.contract_id);
    
    var box_control = await context.app
        .service('box-control')
        .find({})

    var num_required = parseFloat(box_control.num_needed);

    percentDone = 1;
    if (num_required>0) {
        var percentDone = events.total/num_required;
    }

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
