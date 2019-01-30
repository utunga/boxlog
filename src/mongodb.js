const url = require('url');
const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  mongo_uri = app.get('mongo_uri');
  const dbName = url.parse(mongo_uri).path.substring(1);
  const promise = MongoClient.connect(mongo_uri, {useNewUrlParser:true})
    .then(client => {
      // For mongodb <= 2.2
      if(client.collection) {
        return client;
      }
      console.log(`Mongodb connected to database ${dbName}`);
      return client.db(dbName);
    });

  app.set('mongoClient', promise);
};
