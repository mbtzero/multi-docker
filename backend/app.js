const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const PostModel = require('./models/post');
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")
const app = express();
const mongoose = require('mongoose');



var mongohost = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_HOST) {
    mongohost = "mongodb://" + process.env.MONGODB_HOST;
}

mongoose.connect(mongohost)
    .then( () => {
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

app.use("/posts/", postsRoutes);
app.use("/user/", userRoutes);



app.get('/test/',(req,res, next) => {
    mongoose.connect(mongohost)
        .then( () => {
            console.log('connected to database')
        })
        .catch( () => {
            console.log("connect to database failed")
        })

    res.status(200).json(
        {
            message: 'Test 3 successful',
        });
})

app.get('/admin/posts/',(req,res, next) => {
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
