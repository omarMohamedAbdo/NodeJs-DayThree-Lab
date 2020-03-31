const mongoose = require('mongoose');
const UserModel= require('./users')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: String,
    author: { type : mongoose.Schema.Types.ObjectId, ref : 'User' }
})

postSchema.post('save' , function(){
    if(this.isNew)
    {
        UserModel.findByIdAndUpdate(this.author,   {$push : {posts:this._id}} , (err, user) => {
            if (err) return res.send(err);
        });
    }
})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;