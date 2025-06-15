const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  nonRecCategories: [{ type: String }],
calories: { type: Number },

});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;
