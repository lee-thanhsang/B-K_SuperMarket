// $("#tab-faculty").DataTable({
//     responsive: true,
//     lengthChange: false,
//     autoWidth: false,
//     language: {
//         url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
//     },
//     // buttons: [
//     //     {
//     //         text: "Thêm mới",
//     //         action: function (e, dt, node, config) {
//     //             window.location.href = "/faculty/add";
//     //         },
//     //     },
//     // ],
// });

$(".customer-update-button").click(function(e){
    var Lname = $(this).data("lastname");
    var Fname = $(this).data("firstname");
    var SSN = $(this).data("ssn");
    var Gender = $(this).data("gender");
    var Email = $(this).data("email");
    var PhoneNum1 = $(this).data("phonenum");
    var NumberStreet = $(this).data("numberstreet");
    var Wards = $(this).data("wards");
    var District = $(this).data("district");
    var City = $(this).data("city");

    // console.log(Gender);

    $("#update-customer input[name='LastName']").val(Lname);
    $("#update-customer input[name='FirstName']").val(Fname);
    $("#update-customer input[name='Gender']").val(Gender);
    $("#update-customer input[name='Email']").val(Email);
    $("#update-customer input[name='Phone1']").val(PhoneNum1);
    $("#update-customer input[name='NumberStreet']").val(NumberStreet);
    $("#update-customer input[name='Wards']").val(Wards);
    $("#update-customer input[name='District']").val(District);
    $("#update-customer input[name='City']").val(City);
})

// $(".food-update-button").click(function(e){
//     var PName = $(this).data("pname");
//     var PType = $(this).data("type");
//     var Status = $(this).data("status");
//     var Detail = $(this).data("detail");
//     var Percent = $(this).data("percent");

//     $("#food-update-modal input[name='PName']").val(PName);
//     $("#food-update-modal input[name='Type']").val(PType);
//     $("#food-update-modal input[name='Status']").val(Status);
//     $("#food-update-modal input[name='Detail']").val(Detail);
//     $("#food-update-modal input[name='Percent']").val(Percent);

//     var GName = $(this).data("gname");
//     $("#food-update-modal input[name='GName']").val(GName);
//     $("#food-update-modal input[name='PN']").val(PName);
// })

// $(".warehouse-update-button").click(function(e){
//     var PName = $(this).data("pname");
//     var PType = $(this).data("type");
//     var FromDate = $(this).data("fromdate");
//     var ToDate = $(this).data("todate");
//     var Detail = $(this).data("detail");
//     var Percent = $(this).data("percent");

//     $("#warehouse-update-modal input[name='PName']").val(PName);
//     $("#warehouse-update-modal input[name='Type']").val(PType);
//     $("#warehouse-update-modal input[name='Detail']").val(Detail);
//     $("#warehouse-update-modal input[name='Percent']").val(Percent);

//     var GName = $(this).data("gname");
//     $("#warehouse-update-modal input[name='GName']").val(GName);
//     $("#warehouse-update-modal input[name='PN']").val(PName);
// })

// $(".electronic-update-button").click(function(e){
//     var PName = $(this).data("pname");
//     var PType = $(this).data("type");
//     var Detail = $(this).data("detail");
//     var Percent = $(this).data("percent");

//     $("#electronic-update-modal input[name='PName']").val(PName);
//     $("#electronic-update-modal input[name='Type']").val(PType);
//     $("#electronic-update-modal input[name='Detail']").val(Detail);
//     $("#electronic-update-modal input[name='Percent']").val(Percent);

//     var GName = $(this).data("gname");
//     $("#electronic-update-modal input[name='GName']").val(GName);
//     $("#electronic-update-modal input[name='PN']").val(PName);
// })

// $(".delete-button").click(function(e){
//     var pname = $(this).data("pname");
//     console.log(pname);
//     $("#promotion-delete-modal input[name='PName']").val(pname);
// })