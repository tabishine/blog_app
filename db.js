const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1:27017/tabi3';

 mongoose.connect(mongoUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
  
  const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email:    {type: String, lowercase: true, required: true, unique: true},
    password: { type: String, required: true }
  }, {collection: 'users'});
  exports.User =  mongoose.model('User', UserSchema);

  const BlogSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    created: {type: Date, required: true},
    // title: {type: String},
    content: {type: String, required: true},
    author: {type: String}
  }, {collection: 'blogs'});
  exports.Blog = mongoose.model('Blog', BlogSchema);