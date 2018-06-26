// contract_status-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const contractStatus = new Schema({
    contract: { type: Schema.Types.ObjectId, ref: 'contract' },
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('contractStatus', contractStatus);
};
