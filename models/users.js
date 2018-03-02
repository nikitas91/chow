module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        image_url: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        }
    }, { underscored: true });

    return Users;
};



