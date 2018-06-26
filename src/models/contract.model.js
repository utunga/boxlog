// contract_status-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const contract = new Schema({
    box: { type: Schema.Types.ObjectId, ref: 'box', required: false },
    contractType: { type: Schema.Types.ObjectId, ref: 'contractType' },
  }, {
    timestamps: true
  });

  return mongooseClient.model('contract', contract);
};
