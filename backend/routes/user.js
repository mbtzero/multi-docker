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
        }).catch(() => {
            console.log('user save to dabase error')
        })

        res.status(201).json({message: 'signup successful 2'});
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
    res.status(201).json({message: 'signup successful 2'});

})

module.exports = router;
