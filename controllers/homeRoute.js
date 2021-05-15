const router = require('express').Router();
const withAuth = require('../utils/auth');

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

router.get('/update', async (req, res) => {
  try {
    res.status(200).render('update');
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

router.get('/pokedex', withAuth, async (req, res) => {
  try {
    res.status(200).render('pokedex');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/scores', withAuth, async (req, res) => {
  try {
    res.status(200).render('scores');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/menu', withAuth, async (req, res) => {
  try {
    res.status(200).render('menu');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/chatbox', withAuth, async (req, res) => {
  try {
    //move fetch for pokeapi here here??
    res.status(200).render('chatbox');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
