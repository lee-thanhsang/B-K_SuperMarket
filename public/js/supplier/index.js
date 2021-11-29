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

$(".update-promotion-button").click(function(e){
    var PID = $(this).data("pid");
    var PName = $(this).data("pname");
    var PType = $(this).data("ptype");
    var Detail = $(this).data("detail");
    var Percent = $(this).data("percent");
    var FromDate = $(this).data("fromdate");
    var ToDate = $(this).data("todate");

    console.log(ToDate)
    $("#update-promotion-modal input[name='PID']").val(PID);
    $("#update-promotion-modal input[name='PName']").val(PName);
    $("#update-promotion-modal input[name='PType']").val(PType);
    $("#update-promotion-modal input[name='Detail']").val(Detail);
    $("#update-promotion-modal input[name='Percent']").val(Percent);
    $("#update-promotion-modal input[name='FromDate']").val(FromDate);
    $("#update-promotion-modal input[name='ToDate']").val(ToDate);
})


$(".delete-button").click(function(e){
    var PID = $(this).data("pid");
    console.log(PID);
    $("#promotion-delete-modal input[name='PID']").val(PID);
})