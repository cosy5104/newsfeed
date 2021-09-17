const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=>{
        done(null, user);
    });

});
passport.use(
    new GoogleStrategy({
clientID: keys.googleClientID,
clientSecret: keys.googleClientSecret, 
callbackURL: 'http://localhost:3000/auth/google/callback',
proxy: true
},
async (accessToken, refreshToken, profile, done)=>
{try{
    const existingUser=await User.findOne({ googleId: profile.id })
        if (existingUser){
        //we already have a record withthe given profile id
        return done(null, existingUser);
    }
    else{
        //we dont have a user record with this id, make a new record
    const user=await new User({ googleId: profile.id }).save();
    done(null, user);}}
    catch (err) {
        console.error("Something went wrong")
        console.error(err)
    }
    
}
)
);