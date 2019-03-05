require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
let Table = require('tty-table');
var chalk = require('chalk');
keys = require("./keys.js")

//mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    // port
    port: 3306,
    // database username
    user: keys.user,
    // database password
    password: keys.password,
    //database name
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // runSearch();
    queryAllProducts();
});

function queryAllProducts() {
    console.log(chalk.bold("\nDisplaying all products available for sale..."));
    connection.query("SELECT * FROM products", function (err, res) {

        var productListHeader = [
            {
                value: chalk.redBright('ID')
            },
            {
                value: chalk.yellowBright('Product Name')
            },
            {
                value: chalk.greenBright('Price')
            },
            {
                value: chalk.cyanBright('Stock')
            }
        ];

        var productListRows = [];

        for (var i = 0; i < res.length; i++) {
            productListRows.push([
                res[i].product_id, 
                res[i].product_name, 
                "$" + res[i].price,
                res[i].stock_quantity
            ]);
        }

        var productList = Table(productListHeader, productListRows, {
            borderStyle:1,
            truncate: "..."
        });

        console.log(productList.render())
        promptUserForOrder();
    });
}

function promptUserForOrder() {
    inquirer
        .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the Product ID of the item you would like to buy?",
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || chalk.redBright("This should be a number!");
              },
            filter:Number
        }, 
        {
            name: "quantity",
            type: "input",
            message: "How many you would like to buy?",
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || chalk.redBright("This should be a number!");
              },
            filter: Number
        }  
    ]).then(function (input) {

            var orderID = input.id;
            var orderQuantity = input.quantity;

            connection.query(
                "SELECT * FROM products WHERE ?", {
                    product_id: orderID
                },
                function (err, res) {
                    if (err) throw err;
                    displayReceipt();
                    
                    var receiptListHeader = [
                        {
                            value: chalk.yellowBright('Product Name')
                        },
                        {
                            value: chalk.cyanBright('Quantity')
                        },
                        {
                            value: chalk.greenBright('Total Cost $')
                        }
                    ];

                    var receiptListRow = [];

                    for (var i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity >= orderQuantity) {
                            var total = orderQuantity * res[i].price;
                            receiptListRow.push([res[i].product_name, orderQuantity, '$' + total.toFixed(2)]);
                            var receiptList = Table(receiptListHeader, receiptListRow, {
                                borderStyle:1,
                                truncate: "..."
                            })
                            console.log(receiptList.render())
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [{
                                        stock_quantity: res[i].stock_quantity - orderQuantity
                                    },
                                    {
                                        product_id: input.id
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    purchaseSuccess();
                                    repromptUser()
                                }
                            )
                        } else {

                            console.log(chalk.redBright(" Insufficient quantity please try again"));
                            console.log(chalk.greenBright(" Available stock: ") + res[i].stock_quantity + "\n");
                            console.log("-------------------------------------------------------------------");
                            repromptUser()
                        };
                    };

                }
            )
        })
}

function displayReceipt() {
    console.log("\n-------------------------------------------------------------------");
    console.log(chalk.bold("                         Order Summary                             "));
    console.log("-------------------------------------------------------------------");  
}

function purchaseSuccess() {
    console.log("\n-------------------------------------------------------------------");
    console.log(chalk.greenBright("                      Puchase Successful!                          "));
    console.log("-------------------------------------------------------------------");   
}

//ask if they would like to purchase another item
function repromptUser() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (answer) {
        if (answer.reply) {
            queryAllProducts();
        } else {
            console.log("See you soon!");
            connection.end();
        }
    });
}
