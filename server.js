const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const passport = require("passport");
const passportSetup = require("./config/auth");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

let PORT = process.env.PORT || 3000;

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/routes.js")(app);
require("./routes/auth-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening at localhost:" + PORT);
    });
});