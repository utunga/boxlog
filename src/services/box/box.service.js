// Initializes the `box` service on path `/box`
const createService = require('feathers-mongoose');
const createModel = require('../../models/box.model');
const hooks = require('./box.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/box', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('box');

  service.hooks(hooks);
};
