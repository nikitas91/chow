
create database chow_db;

use chow_db;

create table users
(
	id integer(10) auto_increment,
    user_name varchar(50) not null,
    first_name varchar(50),
    last_name varchar(50),
    primary key(id)
);

create table food_category
(
	id integer(10) auto_increment,
    category_name varchar(100),
    primary key(id)
);

create table user_food_category
(
	id integer(10) auto_increment,
    user_id integer(10) not null,
    food_category_id integer(10) not null,
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(food_category_id) references food_category(id)
);

create table user_restaurant_matches
(
	id integer(10) auto_increment,
    user_id integer(10) not null,
    yelp_business_id varchar(100),
    yelp_business_name varchar(100),
    matched_date datetime,
    primary key(id),
    foreign key(user_id) references users(id)
);