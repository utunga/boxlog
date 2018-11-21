// contract-event-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const contractEvent = new Schema({
    contract_id: { type: Schema.Types.ObjectId, ref: 'contract' },
    message: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('contractEvent', contractEvent);
};
