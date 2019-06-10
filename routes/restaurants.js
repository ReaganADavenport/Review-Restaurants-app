const express = require('express'),
  router = express.Router(),
  RestaurantModel = require('../models/restaurant');

/* GET home page. */
router.get('/', async (req, res, next) => {
    const allRestaurants = await RestaurantModel.getAll();
    console.log(allRestaurants);
    res.render('template', { 
        locals: {
            title: "Restaurants in Atlanta",
            is_logged_in: req.session.is_logged_in,
            restaurantList: allRestaurants,
            first_name: req.session.first_name,
            user_id: req.session.user_id
        },
        partials:{
            partial: 'partial-restaurants'
        }
    });
});

router.get('/:restaurant_id', async (req, res, next) => {
    const restaurant_id= req.params.restaurant_id;
    const oneRestaurant = await RestaurantModel.getOne(restaurant_id);
    const restaurantInstance = new RestaurantModel(restaurant_id, null, null, null, null, null, null);
    const restaurantReviews = await restaurantInstance.getReviews();
    console.log(restaurantReviews);

    console.log(oneRestaurant);
    res.render('template', { 
        locals: {
            title: "Restaurants in Atlanta",
            is_logged_in: req.session.is_logged_in,
            oneRestaurantList: oneRestaurant,
            first_name: req.session.first_name,
            user_id: req.session.user_id,
            restaurant_id: req.params.restaurant_id,
            reviewData: restaurantReviews
        },
        partials:{
            partial: 'partial-one-restaurant'
        }
    });
});

router.post('/reviews',  (req, res,) =>{
    console.log("review post", req.body);
    const { score, content, restaurant_id, user_id} = req.body;

    RestaurantModel.addReview(score, content, restaurant_id, user_id).then(response => {
        console.log(response);
        // req.session.first_name = first_name;
        // console.log("first name is",first_name);
        req.session.user_id = user_id;
        console.log("User ID is", user_id)
        req.params.restaurant_id = restaurant_id;
        console.log("Restaurant ID is", restaurant_id)
        res.redirect(`/restaurants`);
    })
});


module.exports = router;