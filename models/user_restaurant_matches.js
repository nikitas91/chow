module.exports = function(sequelize, DataTypes) {
    var user_restaurant_matches = sequelize.define("user_restaurant_matches", {
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
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
              },
              updated_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
              }
        },

    });
    return user_restaurant_matches;
};