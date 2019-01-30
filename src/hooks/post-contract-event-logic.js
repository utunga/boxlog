
const mqtt = require('../middleware/mqtt_wrapper');


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
    //FIXME: should load logic depending on contract type
    //       for now we just always run toggler Logic
    console.log("running 'toggler' contract logic..");

    // how many events for this particular contract?
    var events = await context.app
        .service('contract-event')
        .find({query: {
                contract_id: context.data.contract_id,
                $limit: 0 // $limit==0 makes this a faster/count query
              }});

    var contract = await context.app
        .service('contract')
        .get(context.data.contract_id);
    
    // if an odd number of events, toggle on; otherwise off

    function receiveStatusEvent(box_id, boxStatusMessage) {
        context.app.service('box-status').create({
            box_id: box_id,
            status: boxStatusMessage
        });
    }
 
    if (events.total % 2 == 1) {
        console.log("toggling on"); 
        mqtt.send(context.app, "true", contract.box_id, receiveStatusEvent); 
    }
    else {
        console.log("toggling off");   
        mqtt.send(context.app, "false", contract.box_id, receiveStatusEvent); 
    }
    

    // Best practice: hooks should always return the context
    return context;
  };
};
