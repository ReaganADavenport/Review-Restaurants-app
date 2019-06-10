const express = require('express'),
  router = express.Router();

const  RestaurantsController = require('../controllers/restaurants');

/* GET home page. */
router.get('/', RestaurantsController.getAll_get);

router.get('/:restaurant_id', RestaurantsController.getOne_get);

router.post('/reviews', RestaurantsController.addReview_post);


module.exports = router;