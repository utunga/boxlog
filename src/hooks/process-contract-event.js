

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
     const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.message) {
      throw new Error('A contract event message must have a message');
    }

    //FIXME ultimately we want to get the contract id from the url but 
    //      for now we assume there's only one contract so.. all events relate
    //      to that 
    const theContract = (await context.app.service('contract')
        .find({query: {name: "The active contract"}}))
        .data[0];
    
    // const user = await context.app.service('users').get(userId);
    // const user = context.params.user;
    context.data.contract_id = theContract._id;

    console.log("received contract-event");
    console.log(context.data);
    
    // Best practice: hooks should always return the context
    return context;
  };
};
