const db = require("../models");
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.YELP_API_KEY);

const authCheck = function (req, res, next) {
	if (!req.user) {
		res.redirect("/auth/login");
	}
	else {
		next();
	}
};

module.exports = function (app) {

	app.get("/", function (req, res) {
		res.render("index", { layout: false });
	});

	app.get("/home", authCheck, function (req, res) {
		res.render("home", { user: req.user });
	});

	app.get("/search/:latitude/:longitude", authCheck, function (req, res) {
		db.UserFoodCategory.findAll({
			where: {
				user_id: req.user.id
			},
			include: [db.FoodCategory]
		}).then(dbUserFavorites => {
			let categoryArray = [];

			dbUserFavorites.forEach(element => {
				categoryArray.push(element.category_name);
			});

			let categoryString = categoryArray.join(",");

			client.search({
				latitude: req.params.latitude,
				longitude: req.params.longitude,
				radius: 16095,
				categories: categoryString,
				limit: 50
			}).then(response => {
				res.render("search", {
					yelpData: response.jsonBody,
					user: req.user
				});
			}).catch(e => {
				console.log(e);
			});
		});
	});

	app.get("/favorites", authCheck, function (req, res) {
		db.UserFoodCategory.findAll({
			where: {
				user_id: req.user.id
			},
			include: [
				db.FoodCategory,
				db.Users
			],
			order: [
				[db.FoodCategory, "category_name", "ASC"]
			]
		}).then(dbUserCategories => {
			res.render("favorites", {
				userFavorites: dbUserCategories,
				user: req.user
			});
		});
	});

	app.get("/activity", authCheck, function (req, res) {
		db.UserRestaurantMatches.findAll({
			where: {
				user_id: req.user.id
			},
			include: [db.Users],
			order: [
				["updated_at", "DESC"]
			]
		}).then(dbActivity => {
			res.render("activity", {
				activityData: dbActivity,
				user: req.user
			});
		});
	});

	app.post("/api/save-match", authCheck, function(req, res){
		db.UserRestaurantMatches.create({
			yelp_business_id: req.body.yelpID,
			yelp_business_name: req.body.yelpBusinessName,
			matched_date: req.body.matchDate,
			user_id: req.user.id
		}).then(() => {
			res.send("rows inserted");
		});
	});

	app.get("/api/categories", authCheck, function (req, res) {
		db.FoodCategory.findAll({
			order: [
				["category_name", "ASC"]
			]
		}).then(function (dbData) {
			res.json(dbData);
		});
	});

	app.post("/api/categories", authCheck, function (req, res) {
		if (req.body) {
			for (var key in req.body) {
				let categoryValue = req.body[key];
				db.FoodCategory.findOne({ where: { category_name: categoryValue } }).then(foodCategoryItem => {
					db.UserFoodCategory.create({
						food_category_id: foodCategoryItem.id,
						user_id: req.user.id
					}).then(() => {
						console.log("successful insert");
					});
				});
			}
		}
		res.send("rows inserted");
	});

	app.delete("/api/categories/:id", authCheck, function (req, res) {
		db.UserFoodCategory.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.send("record deleted");
		});
	});

	app.delete("/api/matches/:id", authCheck, function (req, res) {
		db.UserRestaurantMatches.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.send("record deleted");
		});
	});

	app.post("/api/saveresturaunt", authCheck, function (req, res) {

	});
};