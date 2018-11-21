const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect( process.env.DB,
     ()=>{ console.log("connected to database " + process.env.DB); });
  mongoose.Promise = global.Promise;

  //|| app.get('mongodb'), 
  app.set('mongooseClient', mongoose);
};
