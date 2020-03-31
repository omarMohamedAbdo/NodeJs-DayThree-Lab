const express = require('express')
const UserModel= require('../models/users')
const router = express.Router();

router.get('/',(req,res)=>{
    UserModel.find({},(err,users)=>{
        if (err) return res.send(err);
        res.json(users)
    })
  
})

router.get('/:id',(req,res)=>
{
    UserModel.findById(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

router.get('/:id/posts',(req,res)=>
{
    UserModel.findById(req.params.id).populate('posts').exec((err,user)=>{
        if (err) return res.send(err);
        res.json(user);
    });
});

router.post('/',(req,res)=>{
    const { body : {firstName,lastName,email,password,posts} } = req
    const user = new UserModel({
        firstName,
        lastName,
        email,
        password,
        posts,
    })
    user.save((err, user) => {
        if (err) return res.send(err);
        res.json(user);
    })
})

router.patch('/:id' , (req,res)=>{
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        user.save();
        res.json(user);
    });
});


router.delete("/:id", function(req, res) {
    UserModel.findByIdAndDelete(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

module.exports = router;