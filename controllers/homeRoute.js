//not yet (check back when getting more info)
const router = require('express').Router();
const { Pokemon, User } = require('../models');

router.get('/', async (req, res) => {
    try {  
      res.render('homepage', {
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  
  module.exports = router;