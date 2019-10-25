const express = require('express')

const User = require('../models/user');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/signup',(req,res, next) => {
  console.log('in signup api')


})

// Log user in
router.post('/login',(req,res, next) => {
  console.log('in login api')
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if (!user) {
        console.log('could not find user for login')
        return res.status(401).json({ message: 'failed'})
      }

      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
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
