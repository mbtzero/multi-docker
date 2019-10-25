const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const PostModel = require('./models/post');
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")
const app = express();
const mongoose = require('mongoose');



mongoose.connect("mongodb://127.0.0.1:27017").then( () => {
  console.log('connected to database')
})
  .catch( () => {
    console.log("connect to database failed")
  })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requrest-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH, OPTIONS")
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname,"angular")));

app.use("/api/posts/", postsRoutes);
app.use("/api/user/", userRoutes);

app.get('/api/posts/',(req,res, next) => {
    return res.status(200).json(
        {
            message: 'Stub call',
        });

    PostModel.find( {visible: "1" } ).then((documents => {
      res.status(200).json(
      {
        message: 'Post successfully fetched',
        posts: documents,
      });
    })
  );
})

app.get('/api/test/',(req,res, next) => {
    res.status(200).json(
        {
            message: 'Test successful',
        });
})

app.get('/api/admin/posts/',(req,res, next) => {
  PostModel.find( ).then((documents => {
      res.status(200).json(
        {
          message: 'Post successfully fetched',
          posts: documents,
        });
    })
  );
})





module.exports = app;
