const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutDir: __dirname + "/views/layouts",
    partialsDir: [
        __dirname + "/views"
    ]
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function(){
	console.log("server started on port " + PORT);
});