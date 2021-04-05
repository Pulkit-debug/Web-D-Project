const Chatbox = require("../models/chat_box");

module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:9000",
      methods: ["GET", "POST"],
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });

    socket.on("join_room", function (data) {
      console.log("joining request received", data);

      // joining the socket after request has been recieved
      socket.join(data.chatRoom);


      io.in(data.chatRoom).emit("user_joined", data);
    });

    // broadcast the coming message to everyone.
    socket.on("send_message", async function (data) {
      // this data contains the message
      // let chat = await Chatbox.create({ $push: { messages: data.message } });
      // chat.save();

      // chat.messages.push(data.message);

      io.in(data.chatRoom).emit("receive_message", data);

    });
  });
};
