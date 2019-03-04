var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1213",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // runSearch();
    queryAllProducts();
});


function queryAllProducts(){
    console.log("\nDisplaying all products available for sale...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("-------------------------------------------");
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].product_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
        }
        console.log("-------------------------------------------");
        promptUserForProductID();
    }
  );
}


function promptUserForProductID(){
    // queryAllProducts();
    inquirer
        .prompt({
            name: "productID",
            type: "input",
            message: "What is the ID of the prouct you would like to buy?",
            validate: checkForValidInput,
            filter:Number
        })
        .then(function(input){
            
        })
}    