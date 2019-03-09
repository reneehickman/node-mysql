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
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    queryProducts();
                    break;

                case "View Low Inventory":
                    queryLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "exit":
                endConnection();
                    break;
            }
        });
};

function endConnection(){
    connection.end(); 
}

function queryProducts() {
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
        console.log(productList.render());
        promptMenuOptions();
    });



};

function queryLowInventory() {
console.log(chalk.bold("\nDisplaying low inventory (quantity < 5)"));
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {

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
        console.log(productList.render());
        promptMenuOptions();

    });
};

function addToInventory() {

    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        var productArray = [];
        //pushes each product into an array
        for(var i=0; i<res.length; i++){
          productArray.push(res[i].product_id);
        }

    inquirer
    .prompt([
    {
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to add?",
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || chalk.redBright("This should be a number!");
          },
        filter:Number
    }, 
    {
        name: "quantity",
        type: "input",
        message: "How many you would like to add?",
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || chalk.redBright("This should be a number!");
          },
        filter: Number
    }  
]).then(function (input) {

        var productID = input.id;
        var addQuantity = input.quantity;
        var stockQuantity;

        for(i=0; i < res.length; i++){
            if(res[i].product_id === productID){
                stockQuantity = res[i].stock_quantity;

                var productListHeader = [
                    {
                        value: chalk.yellowBright('Product Name')
                    },
                    {
                        value: chalk.redBright('Previous Quantity')
                    },
                    {
                        value: chalk.cyanBright('# to Add')
                    },
                    {
                        value: chalk.greenBright('Updated Quantity')
                    }
                ];
    
                var productListRow = [];
    
                        var newBalance = res[i].stock_quantity + addQuantity;
                        productListRow.push([res[i].product_name, res[i].stock_quantity, addQuantity, newBalance]);
                        var productList = Table(productListHeader, productListRow, {
                            borderStyle:1,
                            truncate: "..."
                        })
                        console.log(productList.render())
        
            }
        }

        connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                    stock_quantity: stockQuantity + addQuantity
                },
                {
                    product_id: productID
                }
            ],
            function (err, res) {
                if (err) throw err;
                inventorySummary();
                console.log("Product Successfully Added!");
                promptMenuOptions();
            }
        )
    })
})

};

function addNewProduct() {

};

function inventorySummary() {
    console.log("\n-------------------------------------------------------------------");
    console.log(chalk.bold("                         Inventory Summary                             "));
    console.log("-------------------------------------------------------------------");  
}


//ask if they would like to purchase another item
function promptMenuOptions() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to go back to the menu?"
    }]).then(function (answer) {
        if (answer.reply) {
            runSearch();
        } else {
            console.log("You session has ended.");
            connection.end();
        }
    });
}