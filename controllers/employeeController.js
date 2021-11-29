var express = require('express');
var router = express.Router();

var employeeModel = require('../models/employeeModel');

var msnv;

router.get('/home', function(req, res) {
    msnv = req.session.User.msnv;
    res.render("employee/home");
});

router.get('/profile', async function(req, res) {
    let viewBag = await employeeModel.getInfoEmployee(msnv);
    
    viewBag["infomation"] = viewBag["infomation"][0];
    viewBag['infomation'].BirthDay = viewBag['infomation'].BirthDay.toISOString().slice(0, 10);
    viewBag['infomation'].Point = (await employeeModel.getPointEmployee(msnv))[0].Point;
    res.render("employee/profile/profile", viewBag);
});

router.post('/update-profile', async function(req, res){
    content = req.body;
    content.SSN = msnv;
    await employeeModel.updateEmployee(content);
    res.redirect("/employee/profile");
});

router.get('/history', async function(req, res) {
    let viewBag = await employeeModel.getHistoryEmployee(msnv);
    res.render("employee/profile/history", viewBag);
});

router.get('/answer-question-customer', async function(req, res) {
    let viewBag = {ques_ans: await employeeModel.getQuestionWithOutAnswer()};
    res.render("employee/answer_question", viewBag);
});

router.get('/customer-information', async function(req, res) {
    let viewBag = {customerList: await employeeModel.getAllCustomer()};
    res.render("employee/customer_info", viewBag);
});

router.get('/employee-information', async function(req, res) {
    let viewBag = {employeeList: await employeeModel.getAllEmployee()};
    res.render("employee/employee_info", viewBag);
});

router.post("/add-answer", async function(req, res){
    req.body.SSN = msnv;
    await employeeModel.addAnswer(req.body);
    res.redirect("answer-question-customer");
});

router.get('/answer-question-supplier', async function(req, res) {
    let viewBag = {ques_ans: await employeeModel.getQuestionWithOutAnswerSupplier()};
    res.render("employee/answer_question_supplier", viewBag);
});

router.post("/add-answer-supplier", async function(req, res){
    req.body.SSN = msnv;
    await employeeModel.addAnswerSupplier(req.body);
    res.redirect("answer-question-supplier");
});

router.get('/promotion', async function(req, res) {
    let viewBag = await employeeModel.getPromotion();
    for(let item of viewBag['fashion']){
        if(item.Gender == 0){
            item.Gender = "Nam";
        }
        else{
            item.Gender = "Nữ";
        }
    }
    res.render("employee/promotion", viewBag);
});

router.get("/customer-rate", async function(req, res){
    let SSN = msnv;
    let viewBag = await employeeModel.getRateForEmployee(SSN);
    res.render("employee/viewRate", {rating: viewBag});
});

module.exports = router;