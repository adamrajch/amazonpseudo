drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INT(11),
    stock_quantity INT(11),
    PRIMARY KEY(item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values("motorcycle", "automotive", 5000, 10);

insert into products (product_name, department_name, price, stock_quantity)
values("mustang", "automotive", 10000, 15);

insert into products (product_name, department_name, price, stock_quantity)
values("machine gun", "daily", 990, 200);

insert into products (product_name, department_name, price, stock_quantity)
values("seashell necklace", "fashion", 20, 5);

insert into products (product_name, department_name, price, stock_quantity)
values("eyedrops", "daily", 3, 1000);


insert into products (product_name, department_name, price, stock_quantity)
values("samurai sword", "daily", 45000, 3);

insert into products (product_name, department_name, price, stock_quantity)
values("jetplane", "automotive", 100, 320);

insert into products (product_name, department_name, price, stock_quantity)
values("train", "automotive", 500000, 1);

insert into products (product_name, department_name, price, stock_quantity)
values("notebook", "daily", 340, 4000);
