DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
product_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR (30),
price DECIMAL(5,2),
stock_quantity INTEGER(10),
PRIMARY KEY (product_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Meow Mix Cat Food', 'Pet Supplies', 16.73, 19);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Dr. Elseys Cat Litter', 'Pet Supplies', 18.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Hot Dog Toaster', 'Home & Kitchen', 38.99, 11);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Vicks Humidifier', 'Home & Kitchen', 29.99, 31);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Bauer Hockey Stick', 'Sports & Outdoors', 199.99, 2);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('TaylorMade Golf Bag', 'Sports & Outdoors', 116.39, 54);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Xbox One', 'Toys & Games', 206.65, 9);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Monopoly', 'Toys & Games', 9.97, 41);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Crest Toothpaste', 'Beauty & Health', 7.97, 27);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Pantene Shampoo & Conditioner', 'Beauty & Health', 10.99, 7);


