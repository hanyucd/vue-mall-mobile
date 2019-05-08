const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_NAME: { type: String },
  IMAGE: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);