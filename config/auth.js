const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.Users.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    db.Users.findOrCreate({
        where: {
            id: profile.id
        }, defaults: {
            id: profile.id,
            user_name: profile.displayName,
            image_url: profile.photos[0].value
        }
    }).spread(function (user, created) {
        done(null, user);
    }).catch(function (err) {
        done(err, null);
    });
}
));