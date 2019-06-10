const express = require('express'),
  router = express.Router();
  

const  UsersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'User Page',
      is_logged_in: req.session.is_logged_in, 
    },
    partials: {
      partial: 'partial-users'
    }
  });
});


router.get('/signup', UsersController.signup_get);

router.post('/signup', UsersController.signup_post);

router.get('/logout', UsersController.logout_get);


router.get('/login', UsersController.login_get);

router.post('/login', UsersController.login_post);

module.exports = router;
