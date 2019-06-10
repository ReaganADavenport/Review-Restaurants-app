create database restaurantapp;

create table restaurant(
    id serial primary key,
    name varchar(200),
    address varchar(200),
    street varchar(200),
    city varchar(200),
    state varchar(200),
    menu varchar (500)
);

create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);


create table reviews(
    id serial primary key,
    score integer,
    content varchar(200),
    restaurant_id integer references restaurant(id),
    user_id integer references users(id)
);