const db = require('./conn.js');

class Restaurant{
    constructor(id, name, address, street, city, state, menu){
        this.id = id;
        this.name = name;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.menu = menu;
    }

    static async getAll(){
        try{
            const response = await db.any(`select * from restaurant`);
            return response;
        } catch(err){
            return err.message;
        }
    };

    static async getOne(restaurant_id){
        try{
            const query = `select * from restaurant where id=$1`;
            const response = await db.one(query, [restaurant_id]);
            restaurantInstance = new Restaurant(restaurant_id, null, null,null,null,null,null);
            return restaurantInstance;
        } catch(err){
            return err.message;
        }
        
    }

    async getReviews(){
        try{
            const response = await db.any(`
            select * from 
                reviews 
            where 
                restaurant_id=$1`, [this.id]
            );
            return response;

        }catch(err){
            return err.message
        }
    }

    static async addReview(score, content, restaurant_id, user_id) {
        try{
            const response = await db.one(`
            insert into reviews
            (score, content, restaurant_id, user_id)
            values
                ($1, $2, $3, $4)
            returning id
            `, [score, content, restaurant_id, user_id]);
            return response;
    
        } catch(err){
            return err.message
        }
        }

}

module.exports = Restaurant;