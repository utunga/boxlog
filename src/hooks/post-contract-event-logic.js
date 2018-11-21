
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

    // if an odd number of events, toggle on; otherwise off
    if (events.total % 2 == 1) {
        console.log("toggling on"); 
        mqtt.send("true"); 
    }
    else {
        console.log("toggling off");   
        mqtt.send("false"); 
    }
    

    // Best practice: hooks should always return the context
    return context;
  };
};
