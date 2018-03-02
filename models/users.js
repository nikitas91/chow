module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        first_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        }
    }, { underscored: true });

    return Users;
};



