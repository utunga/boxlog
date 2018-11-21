module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.status) {
      throw new Error('A box status message must have a status');
    }

    if(!(data.status == "opened" ||
         data.status == "closed")) {
      throw new Error('The box status message must be either opened or closed (for now).');
    }

    // // The authenticated user
    // const user = context.params.user;
    const status = context.data.status

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      status: status,
      // Set the user id
      // userId: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
