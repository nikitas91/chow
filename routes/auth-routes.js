const passport = require("passport");

module.exports = function (app) {
    app.get("/auth/login", function (req, res) {
        res.render("login", { layout: false });
    });
    app.get("/auth/logout", function (req, res) {
        // log out code
        res.render("login", { layout: false });
    });
    app.get("/auth/google",
        passport.authenticate("google", { scope: ["profile"] }));

    app.get("/auth/google/callback",
        passport.authenticate("google"),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/home');
        });
};