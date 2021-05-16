const router = require('express').Router();
const { Pokemon } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const newPokemon = await Pokemon.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    console.log(newPokemon);
    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/:id', withAuth, async (req, res) => {
//   try {
//     res.status(200).json(newPokemon);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newPokemon = await Pokemon.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const pokemonData = await Pokemon.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!pokemonData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(pokemonData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
