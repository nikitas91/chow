module.exports = function(sequelize, DataTypes) {
    var user_food_category = sequelize.define("user_food_category", {
        // Giving the user model a name of type STRING
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                len: [1, 10]
            }
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        },

        food_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        }
    });

    return user_food_category;
}