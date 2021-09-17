const mongoose = require('mongoose');
const {Schema}= mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0}
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);
