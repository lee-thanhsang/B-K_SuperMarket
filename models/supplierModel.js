var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website_db",
});

exports.getInfoSupplier = async function (SID) {
    return {infomation: await connection.awaitQuery(`SELECT * FROM supplier WHERE SID = ${SID}`)
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

exports.getMyPromotion = async function(SID) {
    return {
        food: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Food' AND SID = ${SID};`),
        fashion: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Fashion' AND SID = ${SID};`),
        warehouse: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='HouseWare' AND SID = ${SID};`),
        electronic: await connection.awaitQuery(`SELECT * FROM promotion JOIN typeofgoods ON GName=Name WHERE typeofgoods.Type='Electronic' AND SID = ${SID};`)
    };
};

exports.getContact = async function (SID) {
    return await connection.awaitQuery(`SELECT * FROM contact WHERE SID = ${SID}`);
};

exports.getGoods = async function () {
    return await connection.awaitQuery("SELECT * FROM typeofgoods");
};

// //ADD INTO DATABASE
exports.addPromotion = async function(content){
    await connection.awaitQuery(`INSERT INTO promotion VALUES ("${content.PID}", "${content.PName}","${content.SID}", "${content.Type}", "${content.FromDate}", "${content.ToDate}", ${content.Percent}, "${content.Detail}", "${content.GName}")`);
}

exports.addContact = async function(content){
    await connection.awaitQuery(`INSERT INTO contact (SID, SupplierContent, TimeQues) VALUES ("${content.SID}", "${content.message}", "${new Date().toISOString().slice(0, 10)}")`);
}

//UPDATE
exports.updatePromotion = async function(content){
    await connection.awaitQuery(`UPDATE promotion SET PName="${content.PName}", PType="${content.PType}", FromDate="${content.FromDate}", ToDate="${content.ToDate}", NumofPercentRedution="${content.Percent}", Infomation="${content.Detail}", GName="${content.GName}" WHERE SID="${content.SID}" and PID="${content.PID}"`);
}

exports.updateSupplier = async function(content){
    await connection.awaitQuery(`UPDATE supplier SET SName="${content.SName}", BusinessAreas="${content.BusinessAreas}", Email="${content.Email}", PhoneNumber="${content.PhoneNum1}", NumberStreet="${content.NumberStreet}", Wards="${content.Wards}", District="${content.District}", City="${content.City}" WHERE SID="${content.SID}"`);
}

exports.deletePromotion = async function(content){
    await connection.awaitQuery(`DELETE FROM promotion WHERE PID="${content.PID}" and SID="${content.SID}"`);
}
