class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io("http://localhost:3000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets"),e.socket.emit("join_room",{user_email:e.userEmail,chatRoom:"social"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)})),$("#send-message").click((function(){let s=$("#message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatRoom:"social"})})),e.socket.on("receive_message",(function(s){console.log("message received",s.message);let o=$("<li>"),n="other-message";s.user_email==e.userEmail&&(n="self-message"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.user_email})),o.addClass(n),$("#message-list-container").append(o)}))}))}}