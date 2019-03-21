

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
  
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.message) {
      throw new Error('A contract event message must have a message');
    }

    // if(!data.hashtag) {
    //   throw new Error('A contract event message must have a hashtag (for now)');
    // }

    // for now we don't do anything because all the logic
    // is in the post  contract event hook

    console.log("received contract-event");
    console.log(context.data);

    //FIXME ultimately we want to get the contract id from the url but 
    //      for now we assume there's only one contract so.. all events relate
    //      to that 
    const theContract = (await context.app.service('contract')
        .find({query: {name: "The active contract"}}))
        .data[0];
    context.data.contract_id = theContract._id;
    
    // the_control = await context.app.service('box-control').find({});
    // watching_hashtag = the_control.hashtag;

    // if (data.hashtag != watching_hashtag) {
    //     console.log("Skipping " + data.hashtag + " as only watching hashtag:" + watching_hashtag + ".");
    //     context.result = "Skipping " + data.hashtag ;
    //     return context;
    // }
    
    // Best practice: hooks should always return the context
    return context;
  };
};
