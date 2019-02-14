// Initializes the `box-control` service on path `/box-control`
const createModel = require('../../models/box-control.model');
const hooks = require('./box-control.hooks');
const filters = require('./box-control.filters');



const MongooseService = require('feathers-mongoose').Service;

class SingletonService extends MongooseService {
  find(params) {
    return super.find(params).then(data => data[0]);
  }
}

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  
  const options = {
    name: 'box-control',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/box-control', new SingletonService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('box-control');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
