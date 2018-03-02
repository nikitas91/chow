//html routes

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index", /*stuff*/ );
    });

    app.get("/match", function(req, res) {
        res.render("match", /*stuff*/ );
    });

    app.get("/details", function(req, res) {
        res.render("details", /*stuff*/ );
    });

    app.get("/mapit", function(req, res) {
        res.render("mapit", /*stuff*/ );
    });

    app.get("/categories", function(req, res) {
        res.render("categories", /*stuff*/ );
    });
};