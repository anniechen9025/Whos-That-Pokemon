const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/username', withAuth, async (req,res) => {
  try {
    // Get all the data from User model where id is equal to a number
    const getUserName = await User.findOne(
      {
        where: {
          id: req.session.user_id
        }
      }
    )
    
    // plain gets rid of the unncessary data
    const renderUserName = getUserName.get({
      plain: true
    })
    console.log(renderUserName)
    res.status(200).json(renderUserName.name)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
