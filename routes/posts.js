
const express = require("express");
const PostModel = require("../models/posts");
const router = express.Router();

router.get("/", function(req, res) {
    PostModel.find({}).populate('author', 'firstName lastName' ).exec((err,posts)=>{
        if (err) return res.send(err);
        res.json(posts);
    });
});


router.get("/:id", function(req, res) {
    PostModel.findById(req.params.id, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});

router.post("/", function(req, res) {
    const {
        body: { title, content ,author }
    } = req;
    const post = new PostModel({
        title,
        content,
        author
    })

    post.save((err, post) => {
        if (err) return res.send(err);
        res.json(post);
    })
});


router.patch("/:id", function(req, res) {
    PostModel.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});


router.delete("/:id", function(req, res) {
    PostModel.findByIdAndDelete(req.params.id, req.body, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});

module.exports = router;

    