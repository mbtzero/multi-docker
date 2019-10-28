const express = require('express')
const PostModel = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.get('/',(req,res, next) => {

    PostModel.find( {visible: "1" } ).then((documents => {
            res.status(200).json(
                {
                    message: 'Post successfully fetched',
                    posts: documents,
                });
        })
    );
})

router.post('/',
  (req,res, next) => {
  const post = new PostModel(
    {
      title: req.body.title,
      content: req.body.content,
      visible: req.body.visible,
      pts1title: req.body.pts1title,
      pts1points: req.body.pts1points,
      pts2title: req.body.pts2title,
      pts2points: req.body.pts2points,
      pts3title: req.body.pts3title,
      pts3points: req.body.pts3points,

      //  creator: "1"
    }
  );


  post.save().then( () => {
    console.log('saved post to database success')
    console.log(post)
    return res.status(201).json({message: 'post added successfully'});
  }).catch((error) => {
    console.log('save to database error')
    console.log(error)
    return res.status(401).json({message: 'save to database error'});
  })

})

router.delete('/:id/',
  checkAuth,
  (req, res) =>{
  console.log('about to delete')
 // PostModel.deleteOne({_id: req.params.id, creator: req.userData.userId })
    PostModel.deleteOne({_id: req.params.id })
    .then((result)=>{
      if (result.n > 0) {
        res.status(200).json({message: 'post deleted'});
      }
      else {
        res.status(401).json({message: 'not authorized'});
      }
    })
    .catch((ex) =>{
      console.log(ex);
    })

})

module.exports = router;
