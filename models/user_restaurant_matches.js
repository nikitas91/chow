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
            
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },      
    });

    user_restaurant_matches.associate = function(models) {
        // We're saying that a food category should belong to a user. Multiple genres belong to one user.
        // A food category can't be created without a user due to the foreign key constraint
            user_restaurant_matches.belongsTo(models.users, {
            foreignKey: {
                allowNull: false,
                user_id: {
                    type: Sequelize.INTEGER,
            
                    references: {
                    // This is a reference to another model
                    model: users,
            
                    // This is the column name of the referenced model
                    key: 'id'     
                        }
                    }  
                },  
    
            }); 
        };

    return user_restaurant_matches;
};


// one user with many (hasmany) restaurant matches. 