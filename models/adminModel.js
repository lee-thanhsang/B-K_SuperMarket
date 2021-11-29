var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website_db",
});

exports.getAllCustomer = async function () {
    return await connection.awaitQuery(`SELECT * FROM customer`);
};

exports.getAllEmployee = async function () {
    return await connection.awaitQuery(`SELECT * FROM employee`);
};

exports.getAllSupplier = async function () {
    return await connection.awaitQuery(`SELECT * FROM supplier`);
};

exports.getAllBranch = async function () {
    return await connection.awaitQuery(`SELECT * FROM branch`);
};

exports.getAllCustomer = async function (SSN) {
    return await connection.awaitQuery(`SELECT * FROM customer`);
};

exports.getAllPromotion = async function() {
    return {
        food: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Food';`),
        fashion: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Fashion';`),
        warehouse: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='HouseWare';`),
        electronic: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Electronic';`)
    };
};

exports.deleteCustomer = async function(id) {
    await connection.awaitQuery(`DELETE FROM customer WHERE CID=${id}`);
};

exports.deleteEmployee = async function(id) {
    await connection.awaitQuery(`DELETE FROM employee WHERE SSN=${id}`);
};

exports.deleteSupplier = async function(id) {
    await connection.awaitQuery(`DELETE FROM supplier WHERE SID=${id}`);
};

exports.deletePromotion = async function(name, SID) {
    await connection.awaitQuery(`DELETE FROM promotion WHERE PName="${name}" AND SID=${SID}`);
};

exports.deleteBranch = async function(id) {
    await connection.awaitQuery(`DELETE FROM branch WHERE BID=${id}`);
};