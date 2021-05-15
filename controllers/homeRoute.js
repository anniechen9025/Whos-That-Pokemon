const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).render('homepage');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.status(200).render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/game', async (req, res) => {
  try {
    res.status(200).render('game');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/pokedex', async (req, res) => {
  try {
    //move fetch for pokeapi here here??
    res.status(200).render('pokedex');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/scores', async (req, res) => {
  try {
    //move fetch for pokeapi here here??
    res.status(200).render('scores');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/menu', async (req, res) => {
  try {
    res.status(200).render('menu');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/chatbox', async (req, res) => {
  try {
    //move fetch for pokeapi here here??
    res.status(200).render('chatbox');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
