const bcrypt = require('bcryptjs'),
    Users = require('../models/user');

exports.signup_get = (req, res) =>{
    res.render('template', {
        locals: {
            title: 'Sign-up Page',
            is_logged_in: req.session.is_logged_in,
        },
        partials:{
            partial:'partial-signup-form'
        }
    });
};