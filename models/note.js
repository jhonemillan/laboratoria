var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const BlogSchema = new Schema({  
  username: {type: String},
  description: {type: String, required: true},
  creationDate: {type: Date, required: false, default: Date.now()}  
});

module.exports = mongoose.model('Blog', BlogSchema, 'blog');