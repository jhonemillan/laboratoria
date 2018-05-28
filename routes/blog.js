const User = require('../models/user.js');
const Blog = require('../models/note.js');
const express =require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

//Se comienzan los metodos REST
router.get('/allBlogs', (req, res) => {
    // Search database for all blog posts
    Blog.find({}, (err, blogs) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!blogs) {
          res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, blogs: blogs }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
  });


//insertar un nuevo post
router.post('/new', (req, res) => {
    if(!req.body.username){
        res.json({success: false, message: 'api: username could not be loaded'});
    }else{
        if(!req.body.description){
            res.json({success: false, message: 'api: description is missing'});
        }else{
            const blog = new Blog({
                username: req.body.username,
                description: req.body.description
            });

            //ya creo el objeto, ahora a guardarlo
            blog.save((err) => {
                if(err){
                    res.json({success: false, message: err.errmsg})
                }else{
                    res.json({success: true, message: 'Blog saved'});
                }
            });
        }
    }
});

//borrar un post
router.delete('/blog/:id', (req, res) => {
    Blog.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});

module.exports = router;