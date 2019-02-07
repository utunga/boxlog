// box-control-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const boxControl = new Schema({
	box_id: { type: Number, required: true },
  	action: { type: String, required: true },
  	num_needed: { type: Number, required: true },
  	hashtag: { type: String, required: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model('boxControl', boxControl);
};
