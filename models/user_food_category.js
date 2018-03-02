module.exports = function (sequelize, DataTypes) {
    var UserFoodCategory = sequelize.define("UserFoodCategory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, { underscored: true });

    UserFoodCategory.associate = function (models) {
        // We're saying that a food category should belong to a user. Multiple genres belong to one user.
        // A food category can't be created without a user due to the foreign key constraint
        UserFoodCategory.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });

        UserFoodCategory.belongsTo(models.FoodCategory, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return UserFoodCategory;
};