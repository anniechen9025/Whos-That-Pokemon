const sequelize = require('../config/connection');
const { User, Pokemon } = require('../models');

const userData = require('./userData.json');
const pokemonData = require('./pokemonData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pokemon of pokemonData) {
    await Pokemon.create({
      ...pokemon,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
