// Initializes the `boxstatus` service on path `/box`
const createService = require('feathers-memory');
const hooks = require('./boxstatus.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/boxstatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('boxstatus');

  service.hooks(hooks);
  

};
