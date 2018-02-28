//require db
const yelp = require("yelp-fusion");
const keys = require("../keys.js");
const client = yelp.client(keys.yelp.api_key);


module.exports = function(app) {
	//saves a new google user
	app.post("/api/newuser", function(req, res){
		
	});

	//return a list of all resturaunt categories
	app.get("/api/categories", function(req, res){

	});

	//gets users saved categories
	app.get("/api/:user/categories", function(req, res){

	});

	//posts the users selected categories
	app.post("/api/:user/categories", function(req, res){

	});

	//saves a users selected resturaunt
	app.post("/api/:user/saveresturaunt", function(req, res){

	});

	//gets a set of a users possible matching resturaunts
	app.get("/api/:user/resturaunts", function(req, res){

	});
};