var socket = io("http://localhost:4000");

socket.on("server-send-dki-thatbai", function(){
    alert("Sai user name, co nguoi da dang ky ");
});

socket.on("server-send-dki-thanhcong", function(data){
    $("#user").html(data);
    $("#loginform").hide(2000);
    $("#chatform").show(1000);
});

socket.on("server-send-ds-user", function(data){
    $("#boxcontent").html("");
    data.forEach(function(i){
        $("#boxcontent").append("<div class='user'>" + i + "</div>");        
    });
});

socket.on("sever-send-mess", function(data){
    $("#listmess").append("<div>" + data.un + ":" + data.nd + "</div>");
});

$(document).ready(function(){
    $("#loginform").show();
    $("#chatform").hide();

    $("#btnregister").click(function(){
        socket.emit("cliend-send-username", $("#textusername").val());
    });
    $("#btnlogout").click(function(){
        socket.emit("logout");
    });
    $("#btnsendmess").click(function(){
        socket.emit("user-send-mess", $("#text-mess").val());
    });
});