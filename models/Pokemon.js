const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
<<<<<<< HEAD
    index_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
=======
>>>>>>> c6856f5f04a9f6e642eb74fced5508763952bc07
    pokemon_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    pokemon_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    generation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
=======
>>>>>>> c6856f5f04a9f6e642eb74fced5508763952bc07
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pokemon',
  }
);

module.exports = Pokemon;
