const createService = require('feathers-mongoose');
const createModel = require('../../models/contract.model');
const hooks = require('./contract.hooks');

module.exports = function (app) {
    const paginate = app.get('paginate');
    const Model = createModel(app);
    const options = {
        Model,
        paginate 
    };
    
    // Initialize our service with any options it requires
    app.use('/contract', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('contract');

    service.hooks(hooks);
};
