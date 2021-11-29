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

exports.getPointEmployee = async function (SSN) {
    return await connection.awaitQuery(`SELECT ((avg(Point_for_quality) + avg(Point_for_attitude))/2) as Point FROM rate_employee WHERE SSN="${SSN}"`);
};

exports.getInfoEmployee = async function (SSN) {
    return {infomation: await connection.awaitQuery(`SELECT * FROM employee WHERE SSN = ${SSN}`)};
};

exports.getAllEmployee = async function (SSN) {
    return await connection.awaitQuery(`SELECT * FROM employee`);
};

//Update
exports.updateEmployee = async function(content){
    await connection.awaitQuery(`UPDATE employee SET ELastName="${content.ELastName}", EFirstName="${content.EFirstName}", Gender="${content.Gender}", BirthDay="${content.year}-${content.month}-${content.day}", Email="${content.Email}", NumberStreet="${content.NumberStreet}", Wards="${content.Wards}", District="${content.District}", City="${content.City}", PhoneNumber="${content.Phone}" WHERE SSN="${content.SSN}"`);
}

exports.getHistoryEmployee = async function (SSN) {
    return {
        answer_question: await connection.awaitQuery(`SELECT * FROM answer_question aq JOIN customer ON aq.CID = customer.CID WHERE aq.SSN = "${SSN}"`),
        contact_supplier: await connection.awaitQuery(`SELECT * FROM contact JOIN supplier ON contact.SID = supplier.SID WHERE contact.SSN = "${SSN}"`),
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

exports.getQuestionWithOutAnswer = async function () {
    return await connection.awaitQuery("SELECT * FROM answer_question aq JOIN customer ON aq.CID = customer.CID WHERE aq.SSN IS NULL");
};

exports.getQuestionWithOutAnswerSupplier = async function () {
    return await connection.awaitQuery("SELECT * FROM contact JOIN supplier ON contact.SID = supplier.SID WHERE SSN IS NULL");
};

exports.getRateForEmployee = async function (SSN) {
    return await connection.awaitQuery(`SELECT * FROM rate_employee JOIN customer ON customer.CID=rate_employee.CID WHERE rate_employee.SSN="${SSN}"`);
};

exports.addAnswer = async function (content) {
    await connection.awaitQuery(`UPDATE answer_question SET SSN="${content.SSN}", Answer="${content.Answer}", TimeAns="${new Date().toISOString().slice(0, 10)}" WHERE (CID="${content.CID}" AND Question="${content.Question}")`);
};

exports.addAnswerSupplier = async function (content) {
    await connection.awaitQuery(`UPDATE contact SET SSN="${content.SSN}", EmployeeContent="${content.Answer}", TimeAns="${new Date().toISOString().slice(0, 10)}" WHERE (SID="${content.SID}" AND SupplierContent="${content.Question}")`);
};