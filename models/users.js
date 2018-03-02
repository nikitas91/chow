module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        // Giving the user model a name of type STRING
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                len: [1, 10]
            }
        },

        user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
            }
        },

        first_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 50]
            }
        },

        last_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 50]
            }
        }
    });

    return users;
};



