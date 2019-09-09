var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(4000);
var manguser = [];
io.on("connection", function (socket) {
    console.log("co nguoi ket noi:" + socket.id);

    socket.on("cliend-send-username", function (data) {
        if (manguser.indexOf(data) >= 0) {
            socket.emit("server-send-dki-thatbai");
        }
        else {
            manguser.push(data);
            socket.userName = data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-ds-user", manguser);
        }
    });
    socket.on("logout", function () {
        manguser.splice(manguser.indexOf(socket.userName), 1);
        socket.broadcast.emit("server-send-ds-user", manguser);
    });
    socket.on("user-send-mess", function (data) {
        io.sockets.emit("sever-send-mess", { un: socket.userName, nd: data });
    });
});

app.get("/", function (req, res) {
    res.render("trangchu")
});