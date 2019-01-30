const mongoose = require('mongoose');

module.exports = function (app) {
  mongo_uri = app.get('mongo_uri');
  mongoose.connect(mongo_uri, {useNewUrlParser:true})
	  .then(client => {
	  	console.log(`Mongoose connected to database ${mongo_uri}`);
	  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
