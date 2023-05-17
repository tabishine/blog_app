const Express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const dataBase = require('./db');
const bcrypt = require('bcrypt');
const app = Express();

const port =  3000;
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
app.use(bodyParser.json());

//registering user 
app.post('/register', (req, res) => {
  if(!req.body.email || !req.body.password || !req.body.username) {
    res.json({success: false, error: "Send needed params"})
    return
  }
    dataBase.User.create({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  }).then((user) => {
      const token = jwt.sign({id: user._id, email: user.email}, jwtSecret)
      res.json({success: true, token: token})   
  }).catch((err) => {
    res.json({success: false, error: err})
  })
});


//login user 
app.post('/login', (req, res) => {
  if(!req.body.email || !req.body.password) {
    res.json({success: false, error:"Send needed params" })
    return
    } 
    dataBase.User.findOne({email: req.body.email})
    .then((user) => {
      if(!user) {
        res.json({success: false, error: "User does not exist"})
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)){
          res.json({success: false, error: "Wrong password"})
        } else {
          const token = jwt.sign({id: user._id, email: user.email}, jwtSecret)
          res.json({success: true, token: token})
        }
      }
    })
    .catch((err) => {
      res.json({success: false, error: err})
    })
});


//creating post 
app.post('/createpost', (req, res, next) => {
  if(!req.body.created & !req.body.content & !req.body.author) {
    res.json({success: false, error: "Please fill in the field"})
    return;
  }
  dataBase.Blog.create({
    created: req.body.created,
    content: req.body.content,
    author: req.body.author,
  }).then((Blog) => {
    res.json({success: true, Blog});
  })
  .catch((error) => {
    res.json({success: false, error: error.message});
  });
});


//update blog
// app.get('/getblogbyid', (req, res, next) => {
//   const id = req.params.id;


// })


//deleteblog


//pagination



//listening on port
app.listen(port, () => {
  console.log("Server running at " + port);
});