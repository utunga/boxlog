const mqtt = require('../middleware/mqtt_wrapper');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
    //FIXME: should load logic depending on contract type
    //       for now we just always run toggler Logic
    console.log("process box control event ..");

    the_control = await context.app.service('box-control').find({});
    if (the_control) {
        the_control.num_needed = context.data.num_needed;
        the_control.hashtag = context.data.hashtag;
        await context.app.service('box-control').update(the_control._id, the_control);
    }
    
    //FIXME shouldn't have to define this logic twice
    function receiveStatusEvent(box_id, boxStatusMessage) {
        context.app.service('box-status').create({
            box_id: box_id,
            status: boxStatusMessage
        });
    }


    var the_contracts = await context.app
        .service('contract')
        .find({query: {name: "The active contract"}});
    var the_contract = the_contracts.data[0];

    console.log(the_contract);
    context.app.service('box-control').find({}).then(data=>console.log(data));
    
    //context.app.service('contract-event').remove(null,{query: {"box_id":the_contract.box_id}});
    //context.app.service('box-status').remove(null,{query: {"box_id":the_contract.box_id}});
    context.app.service('contract-event').remove(null,{});
    context.app.service('box-status').remove(null,{});
    
    console.log("processs box-control: locking");
    mqtt.send(context.app, "lock", the_contract.box_id, receiveStatusEvent); 

   };
};

