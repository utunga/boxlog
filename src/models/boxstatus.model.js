// box-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const boxStatus = new Schema({
    status: { type: String, required: true },
    box_id: { type: Schema.Types.ObjectId, ref: 'box', required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('boxStatus', boxStatus);
};
