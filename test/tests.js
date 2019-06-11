const chai = require('chai'),
    expect = chai.expect,
    chai_as_promised = require('chai-as-promised');

chai.use(chai_as_promised).should();

const User = require('../models/user');

describe('Users model tests', () => {
    //Given an email, do we get a user obj?
    it('should be a valid user', async () =>{
        const userInstance = new User(null, null, null, 'mcderp@derps.com', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("user is", theUser);
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () =>{
        const userInstance = new User(null, null, null, 'mcderp@derps.com', null);
        const theUser = await userInstance.getUserByEmail();
        
        expect(theUser.id).to.not.be.an('undefined');
    });

    it('should get a list of all users', async() => {
        const allUsers = await User.getAllUsers();
        expect(allUsers).to.not.be.an('undefined');
    });
});

const Restaurant = require('../models/restaurant');

describe('Restaurant model tests', () => {
    //get all the restaurants, hopefully
    it('should get a list of all restaurants', async()=> {
        const allRestaurants = await Restaurant.getAll()
        expect(allRestaurants).to.not.be.an('undefined')
    });

    it('should get a single restaurant by ID', async()=> {
        // const restaurantInstance = new Restaurant(1,null,null,null,null,null,null);
        const theRestaurant = await Restaurant.getOne(1);
        console.log(theRestaurant);
        theRestaurant.should.be.an.instanceOf(Restaurant);
    })
});