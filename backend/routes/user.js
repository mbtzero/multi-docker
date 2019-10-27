const express = require('express')

const User = require('../models/user');
const jwt = require("jsonwebtoken");
const hash = require('object-hash');
const router = express.Router();

router.post('/signup/',(req,res, next) => {
        console.log('in signup api')
        hashed_pwd = hash(req.body.password);
        const user = new User(
            {
                email: req.body.email,
                password: hashed_pwd,
            }
        );

        user.save().then(() => {
            console.log('user saved to database success + ' + hashed_pwd)
        }).catch(() => {
            console.log('user save to dabase error')
        })

        res.status(201).json({message: 'signup successful'});
    }
)

router.get('/test/',(req,res, next) => {
    res.status(200).json(
        {
            message: 'user Test successful',
        });
})

// Log user in
router.post('/login/',(req,res, next) => {
  console.log('in login api')
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if (!user) {
        console.log('could not find user for login')
        return res.status(401).json({ message: 'failed'})
      }

      fetchedUser = user;

      // compare passwords
       enc =  hash(req.body.password);
        console.log("user passed in password")
        console.log(req.body.password)
        console.log('comparing users ' + enc + ' against ' + user.password)

        if (enc == user.password) return true;
        return false;
    })
    .then(result=> {
      if (result) {
        const token = jwt.sign(
          {email: fetchedUser.email, userId: fetchedUser._id},
          'mikehasthispasshashturkeydogpizza',
          { expiresIn: '1h'});
        return res.status(200).json({message: 'user login success', token: token, expiresIn: 3600, userId: fetchedUser._id })
      }
      else
      {
        return res.status(401).json({ message: 'not authorized'})
      }
    })
    .catch( error => {
      console.log(error)
    })
})

module.exports = router;
