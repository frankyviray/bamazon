var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});
presentItems();
function presentItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("                      ")
        console.log("WELCOME TO BAMAZON VIRTUAL MARKETPLACE")
        console.log("                      ")
        for (let i = 0; i < res.length; i++) {
            console.log("item available : " + res[i].product_name)
            console.log("item id : " + res[i].item_id)
            console.log("department : " + res[i].department_name)
            console.log("item price : " + res[i].price)
            console.log("number of items available : " + res[i].stock_quantity)
            console.log("----------------------")
            console.log("                      ")
        }
        start();

    })
}


function read(id, funky) {
    connection.query("SELECT * FROM products WHERE ?", { item_id: id }, function (err, res) {
        funky(res);
    })
}

function updateQuantity(num, id) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?", [num, { item_id: id }], function (err, res) {
        console.log("quantity updated")
    })
}

