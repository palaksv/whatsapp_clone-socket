import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userData, socketId) => {
   /////not getting called
   console.log("adduser 1");
  !users.some((user) => user.sub == userData.sub) &&
    users.push({ ...userData, socketId });
    console.log("adduser 2");
  console.log(users);
};

const getUser = (userId) => {             ///////
  console.log(users.length);                ////users array is empty
  return users.find(user => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUsers", userData => {
    
    addUser(userData, socket.id); 
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", data => {
    const user = getUser(data.receiverId);
    console.log(user);     //user is undefined
    io.to(user.socketId).emit("getMessage", data);
  });
});
