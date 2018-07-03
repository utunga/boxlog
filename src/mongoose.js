const mongoose = require('mongoose');

module.exports = function (app) {
  console.log(app.get('mongodb'))
  console.log(process.env.DB)
  mongoose.connect( process.env.DB || app.get('mongodb'), 
     ()=>{ console.log("connected to database " + process.env.DB || app.get('mongodb'));  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
