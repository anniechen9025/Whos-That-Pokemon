const User = require('./user');
const Pokemon = require('./Pokemon');

User.hasMany(Pokemon, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pokemon.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Pokemon };
