const mongoose = require ('mongoose');
const Bcrypt = require("bcrypt");

const userschema = new mongoose.Schema({
    firstName:{type: String , required: true , minlength: 3 },
    lastName:{type: String, required: true},
    email:{type: String , required: true},
    password: String,
    posts: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Post' }]
})

userschema.pre("save", function(next) {
    // if(!this.isModified("password")) {
    //     return next();
    // }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

userschema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

const userModel = mongoose.model('User',userschema)

module.exports=userModel;