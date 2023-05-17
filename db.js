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
    created: {type: Date},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  })

  exports.Blog = mongoose.model('Blog', BlogSchema);