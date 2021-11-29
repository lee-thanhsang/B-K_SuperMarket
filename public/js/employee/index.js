$(".employee-update-button").click(function(e){
    var ELname = $(this).data("elastname");
    var EFname = $(this).data("efirstname");
    var Gender = $(this).data("gender");
    var Email = $(this).data("email");
    var PhoneNum = $(this).data("phonenum");
    var NumberStreet = $(this).data("numberstreet");
    var Wards = $(this).data("wards");
    var District = $(this).data("district");
    var City = $(this).data("city");


    $("#update-employee input[name='ELastName']").val(ELname);
    $("#update-employee input[name='EFirstName']").val(EFname);
    $("#update-employee input[name='Gender']").val(Gender);
    $("#update-employee input[name='Email']").val(Email);
    $("#update-employee input[name='Phone']").val(PhoneNum);
    $("#update-employee input[name='NumberStreet']").val(NumberStreet);
    $("#update-employee input[name='Wards']").val(Wards);
    $("#update-employee input[name='District']").val(District);
    $("#update-employee input[name='City']").val(City);
});


$(".add-anwser-button").click(function(e){
    var SID = $(this).data("sid");
    var Ques = $(this).data("question");
    $("#add-anwser input[name='SID']").val(SID);
    $("#add-anwser input[name='Question']").val(Ques);

})

