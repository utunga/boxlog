// Initializes the `boxstatus` service on path `/box`
const createService = require('feathers-mongoose');
const createModel = require('../../models/boxstatus.model');
const hooks = require('./box-status.hooks');

module.exports = function (app) {
    const paginate = app.get('paginate');
    const Model = createModel(app);
    const options = {
        Model,
        paginate 
    };
    
    // Initialize our service with any options it requires
    app.use('/box-status', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('box-status');

    service.hooks(hooks);
};
