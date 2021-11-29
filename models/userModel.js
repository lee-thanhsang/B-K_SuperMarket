var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website_db",
});

exports.getInfocustomer = async function (CID) {
    return {infomation: await connection.awaitQuery(`SELECT * FROM customer WHERE CID = ${CID}`)
    };
};

exports.getPromotion = async function() {
    return {
        food: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Food';`),
        fashion: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Fashion';`),
        warehouse: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='HouseWare';`),
        electronic: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Electronic';`)
    };
};

exports.getQuestionAnswer = async function () {
    return await connection.awaitQuery("SELECT * FROM answer_question WHERE NOT Answer = 'NULL'");
};

exports.getRateBranch = async function () {
    return await connection.awaitQuery("SELECT * FROM (rate_branch JOIN branch ON rate_branch.BID = branch.BID) JOIN customer ON customer.CID = rate_branch.CID WHERE rate_branch.Point > 6");
};

exports.getRateEmployee = async function () {
    return await connection.awaitQuery("SELECT * FROM (rate_employee JOIN employee ON rate_employee.SSN = employee.SSN) JOIN customer ON customer.CID = rate_employee.CID WHERE rate_employee.Point_for_quality > 6 AND rate_employee.Point_for_attitude > 6;");
};

exports.getHistoryCustomer = async function (CID) {
    return {
        question: await connection.awaitQuery(`SELECT Question, Answer, SSN, TimeQues as Time, TimeAns FROM answer_question WHERE CID = "${CID}"`),
        join: await connection.awaitQuery(`SELECT * FROM join_in ji JOIN branch ON ji.BID = branch.BID WHERE CID = "${CID}"`),
        rate_branch: await connection.awaitQuery(`SELECT Name, Point, Time, Detail FROM rate_branch rb JOIN branch ON rb.BID = branch.BID WHERE CID = "${CID}"`),
        rate_employee: await connection.awaitQuery(`SELECT ELastName, EFirstName, Point_for_quality, Point_for_attitude, Time, Detail FROM rate_employee re JOIN employee ON re.SSN = employee.SSN WHERE CID = "${CID}"`)
    };
};

exports.getBranch = async function () {
    return await connection.awaitQuery("SELECT Name, BID FROM branch");
};

exports.getEmployee = async function () {
    return await connection.awaitQuery("SELECT SSN, ELastName, EFirstName FROM employee");
};

//Update
exports.updateCustomer = async function(content){
    await connection.awaitQuery(`UPDATE customer SET LastName="${content.LastName}", FirstName="${content.FirstName}", Gender="${content.Gender}", BirthDay="${content.year}-${content.month}-${content.day}", Email="${content.Email}", PhoneNumber="${content.Phone1}", NumberStreet="${content.NumberStreet}", Wards="${content.Wards}", District="${content.District}", City="${content.City}" WHERE CID="${content.CID}"`);
}

//ADD INTO DATABASE
exports.addRateBranch = async function(content){
    await connection.awaitQuery(`INSERT INTO rate_branch VALUES ("${content.CID}", "${content.branch}", "${new Date().toISOString().slice(0, 10)}", "${content.message}", ${parseInt(content.point)})`);
}

exports.addRateEmployee = async function(content){
    await connection.awaitQuery(`INSERT INTO rate_employee VALUES ("${content.CID}", "${content.employee}", "${new Date().toISOString().slice(0, 10)}", "${content.message}", ${parseInt(content.point_quality)}, ${parseInt(content.point_attitude)})`);
}

exports.addQuestion = async function(content){
    await connection.awaitQuery(`INSERT INTO answer_question (CID, TimeQues, Question) VALUES ("${content.CID}", "${new Date().toISOString().slice(0, 10)}", "${content.message}")`);
}