module.exports = function (sequelize, DataTypes) {
    var UserRestaurantMatches = sequelize.define("UserRestaurantMatches", {
        // Giving the user model a name of type STRING
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        yelp_business_id: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 100]
            }
        },
        yelp_business_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 100]
            }
        },
        matched_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { underscored: true });

    UserRestaurantMatches.associate = function (models) {
        UserRestaurantMatches.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
            }
        });
    };

    return UserRestaurantMatches;
};