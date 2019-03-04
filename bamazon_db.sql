DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR (30),
price DECIMAL(5,2),
stock_quantity INTEGER(10),
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Meow Mix Cat Food 22lb', 'Pet Supplies', 16.73, 19);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Dr. Elseys Premium Cat Litter', 'Pet Supplies', 18.49, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Pop-Up Hot Dog Toaster', 'Home & Kitchen', 38.00, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Vicks Cool Mist Humidifier', 'Home & Kitchen', 29.99, 31);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Bauer Vapor 1x Hockey Stick', 'Sports & Outdoors', 199.99, 1);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('TaylorMade Golf Bag', 'Sports & Outdoors', 116.39, 54);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('1000 Piece Wolves Puzzle', 'Toys & Games', 10.97, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Guess Who? Classic Game', 'Toys & Games', 9.77, 41);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Crest 3D Toothpaste 3-Pack', 'Beauty & Health', 14.97, 4);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ('Pantene Pro-V Shampoo & Conditioner', 'Beauty & Health', 38.00, 7);


