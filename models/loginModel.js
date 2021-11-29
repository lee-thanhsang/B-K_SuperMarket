var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website_db",
});

exports.getRole = async function(account_name){
    return (await connection.awaitQuery(`SELECT Account_pass, Role FROM role WHERE Account_Name = "${account_name}"`))[0];
};

exports.updatePassword = async function(account, password){
    await connection.awaitQuery(`UPDATE role SET Account_pass="${password}" WHERE Account_Name = "${account}"`);
};