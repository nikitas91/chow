module.exports = function (sequelize, DataTypes) {
    var FoodCategory = sequelize.define("FoodCategory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        }
    }, { underscored: true });

    return FoodCategory;
};