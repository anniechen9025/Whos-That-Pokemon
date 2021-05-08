const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pokedexRoutes = require('./pokedexRoutes');

router.use('/users', userRoutes);
router.use('/pokedex', pokedexRoutes);

module.exports = router;
