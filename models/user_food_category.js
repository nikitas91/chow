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
        },
    });

    user_food_category.associate = function(models) {
    // We're saying that a food category should belong to a user. Multiple genres belong to one user.
    // A food category can't be created without a user due to the foreign key constraint
        user_food_category.belongsTo(models.users, {
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
                return user_food_category;
                };

// user will have multiple genre of food

// Author.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Author.hasMany(models.Post, {
//       onDelete: "cascade"
//     });
//   };

