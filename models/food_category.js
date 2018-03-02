module.exports = function(sequelize, DataTypes) {
    var food_category = sequelize.define("food_category", {
        // Giving the user model a name of type STRING
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                len: [1, 10]
            }
        },
        
        category_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 100]
            }
        }
    });

    return food_category;
};