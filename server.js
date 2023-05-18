const Express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
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


//update blog by id
app.put('/updatepost/:id', (req, res) => {
  const postId = req.params._id;
  const updateData = {
    created: req.body.created,
    content: req.body.content,
    author: req.body.author,
  };
  console.log("postId:", postId); 
  dataBase.Blog.findById(postId)
  .then((blog) => {
    console.log("blog:", blog); // Check the retrieved blog document
    dataBase.Blog.findByIdAndUpdate(postId, updateData, { new: true })
      .then((updatedBlog) => {
        console.log("updatedBlog:", updatedBlog); // Check the updated blog document
        if (!updatedBlog) {
          return res.status(404).json({ success: false, error: "Blog post not found" });
        }
        res.json({ success: true, updatedBlog });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  })
  .catch((error) => {
    res.status(500).json({ success: false, error: error.message });
  });
});













//delete blog by id
// app.delete('/deletepost/:id', (req, res, next) => {
//  const postId = req.params._id;
//  dataBase.Blog.findByIdAndDelete(postId)
//  .then((deletedBlog) => {
//   if(!deletedBlog){
//     return res.status(404).json({success: false, error: "Blog post not found"});
//   }
//   res.json({success: true, message: "Blog post deleted successfully "});
//  })
//  .catch((error) => {
//   res.status(500).json({success: false, error: error.message});
//  });
// });

//check token validation
// function fetchUserByToken(req){
//   return new Promise((resolve, reject) => {
//     if(req.headers && req.headers.authorization){
//       let authorization = req.headers.authorization
//       let decoded
//       try{
//         decoded = jwt.verify(authorization, jwtSecret)
//       } catch (err) {
//         reject("Token not valid")
//         return
//       }
//       let userId = decoded.id ;
//       dataBase.User.findOne({_id: userId })
//       .then((user) => {
//         resolve(user)
//       })
//       .catch((err) => {
//         reject("Token error")
//       })
//     } else {
//       reject ("No token found")
//     }
//     });
//   }
//listening on port
app.listen(port, () => {
  console.log("Server running at " + port);
});