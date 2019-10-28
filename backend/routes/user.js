const express = require('express')

const User = require('../models/user');
const jwt = require("jsonwebtoken");
const hash = require('object-hash');
const router = express.Router();

router.post('/signup/',(req,res, next) => {
    console.log('in signup api 2')
    hashed_pwd = hash(req.body.password);
    const user = new User(
        {
            email: req.body.email,
            password: hashed_pwd,
        }
    );

    user.save().then(() => {
        console.log('user saved to database success + ' + hashed_pwd)
        return res.status(201).json({message: 'signup successful 2'});
    }).catch(() => {
        console.log('user save to dabase error')
        return res.status(401).json({ message: 'save failed'})
    })
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
  var sts = "started"
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
        sts = sts + " inside find one";
      if (!user) {
        console.log('could not find user for login')
        return res.status(401).json({ message: sts})
      }

      fetchedUser = user;

      // compare passwords
       enc =  hash(req.body.password);
        console.log('comparing users ' + enc + ' against ' + user.password)

        sts = sts + " compare password ";
        if (enc == user.password) {
            sts = sts + " compare password true";
            return true;
        }
        return false;
    })
    .then(result=> {
        sts = sts + " second then ";
      if (result) {
          sts = sts + " second then true ";
        const token = jwt.sign(
          {email: fetchedUser.email, userId: fetchedUser._id},
          'mikehasthispasshashturkeydogpizza',
          { expiresIn: '1h'});
          sts = sts + " token created ";
        return res.status(200).json({message: sts, token: token, expiresIn: 3600, userId: fetchedUser._id })
      }
      else
      {
          sts = sts + " inside else message ";
        return res.status(401).json({ message: sts})
      }
    })
    .catch( error => {
        sts = sts + " inside catch err ";
      return res.status(401).json({ message: sts})
    })
})

module.exports = router;
