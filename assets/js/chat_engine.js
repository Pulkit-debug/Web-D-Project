class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // initiate the connctino
        this.socket = io("http://3.84.83.75:3000");
        // this connect fires an event connection that is present in chat_sockets.js

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;

        this.socket.on("connect", function () {
            console.log("connection established using sockets");

            // asking for joining a room
            // join_room is the event
            self.socket.emit("join_room", {
                user_email: self.userEmail,
                chatRoom: "social",
            });

            self.socket.on("user_joined", function (data) {
                console.log("a user joined", data);
            });

            $("#send-message").click(function () {
                let msg = $("#message-input").val();
                if (msg != "") {
                    self.socket.emit("send_message", {
                        message: msg,
                        user_email: self.userEmail,
                        chatRoom: "social",
                    });
                }
            });

            self.socket.on("receive_message", function (data) {
                console.log("message received", data.message);

                let newMessage = $("<li>");

                let messageType = "other-message";

                if (data.user_email == self.userEmail) {
                    messageType = "self-message";
                }

                newMessage.append($("<span>", {
                    "html": data.message,
                }));

                newMessage.append($("<sub>", {
                    "html": data.user_email,
                }));

                newMessage.addClass(messageType);

                $("#message-list-container").append(newMessage);
            });
        });
    }
}
