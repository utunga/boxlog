const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect( process.env.DB || app.get('mongodb'), 
     ()=>{ console.log("connected to database " + process.env.DB || app.get('mongodb'));  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
