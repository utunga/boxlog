const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const logger = require('feathers-logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const memory = require('feathers-memory');
const seeder = require('feathers-seeder');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const seed = require('./seed')
const mongodb = require('./mongodb');

const mongoose = require('./mongoose');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
app.configure(logger(winston));
app.configure(seeder(seed));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongodb);

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

// make sure 'theContract' is hooked up to 'theBox' 
app.seed().then(() => {
  app.service('contract-type').find({query: {name: "Toggler"}})
  .then(
    togglerContractTypes =>
        app.service('box').find({query: {name: "The only box"}})
        .then(
        theBoxes => 
            app.service('contract').find({query: {name: "The active contract"}})
            .then(
                theContracts => {
                    var togglerContractType = togglerContractTypes.data[0];
                    var theBox = theBoxes.data[0];
                    var theContract = theContracts.data[0];
                    theContract.box_id = theBox._id;
                    theContract.contract_type_id = togglerContractType._id;
                    app.service('contract').update(theContract._id, theContract); 
                }
            )     
        )
    )
});


// remove all box-status and contract-events at startup
app.service('contract-event').remove(null, {});
app.service('box-status').remove(null, {});

         
app.hooks(appHooks);

// On any real-time connection, add it to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));

// Publish all events to the `everybody` channel
app.publish(() => app.channel('everybody'));


module.exports = app;
