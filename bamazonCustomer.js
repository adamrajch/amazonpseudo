var mysql = require('mysql');
var inquirer = require('inquirer');
const { table } = require('table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "squisho",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) {
        throw (err);
    }
    // else {
    //     console.log('connected');
    // }
})

displayTable = () => {
    let config, productTable;
    productTable = [];
    var command = `SELECT * FROM products`;
    connection.query(command, function (err, data) {
        if (err) {
            console.log(err);

        }
        for (let i = 0; i < data.length; i++) {
            var addRow = [data[i].item_id, data[i].product_name, data[i].department_name, data[i].price, data[i].stock_quantity];
            productTable.push(addRow);
            // console.log(addRow)
        }
        config = {
            columns: {
                0: {
                    alignment: 'left',
                    minWidth: 40
                },
                1: {
                    alignment: 'center',
                    minWidth: 40
                },
                2: {
                    alignment: 'right',
                    minWidth: 40
                }
            }
        };
        output = table(productTable, config);
        console.log(output);
    })

}


shopBamazon = () => {
    displayTable();
    inquirer.prompt([{
        type: 'input',
        message: 'what is the ID of the product you want to buy?\n',
        name: 'pickProd'
    }, {
        type: 'input',
        message: 'how many would you like to buy?',
        name: 'pickQuant'
    }]).then(function (ans) {
        connection.query(`select item_id, product_name, price, stock_quantity from products where item_id= ${ans.pickProd}`, function (err, data) {

            if (err) {
                console.log(err);
            }
            else {
                if (ans.pickQuant > data[0].stock_quantity) {
                    console.log('you picked ' + ans.pickQuant)
                    console.log('remaining ' + data[0].stock_quantity)
                    console.log('insuffecient stock!')
                }
                else if (ans.pickQuant <= data[0].stock_quantity) {
                    var newStock = data[0].stock_quantity - ans.pickQuant;
                    connection.query(`update products set stock_quantity= '${newStock}' where item_id= '${data[0].item_id}'`, function (err1, res) {
                        if (err1) {
                            console.log(err1);
                        }
                        displayTable()
                        console.log(`Congratulations you bought ${ans.pickQuant} ${ans.pickProd}!`);
                    })

                }
            }

        })

        // shopBamazon();
    })

}
shopBamazon();


