const mongoose = require('mongoose');
const {Schema}= mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    googleId: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);
