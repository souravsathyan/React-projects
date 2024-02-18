const { Server } = require("socket.io")

const emailToSocketIdMap = new Map()
const socketIdToEmailMap = new Map()

const io = new Server(8000, {
    cors: true
})

io.on("connection", (socket) => {
    console.log("socket connected...", socket.id);


    socket.on("room:join", ({ email, room }) => {
        emailToSocketIdMap.set(email, socket.id)
        socketIdToEmailMap.set(socket.id, email)
        io.to(room).emit("user:joined",{email, id:socket.id})//if there is existing user we send this event
        socket.join(room)//then we join the user in this room
        io.to(socket.id).emit("room:join",{email,room})//we push this user in this room
    });

    socket.on("user:call",({to,offer})=>{
        io.to(to).emit("incoming:call", {from:socket.id, offer})
    })

    socket.on("call:accepted",({to,ans})=>{
        io.to(to).emit("call:accepted", {from:socket.id, ans})

    })

    socket.on("peer:nego:needed", ({to,offer})=>{
        io.to(to).emit("peer:nego:needed",{from:socket.id,offer})
    })

    socket.on("peer:nego:done", ({to,ans})=>{
        io.to(to).emit("peer:nego:final",{from:socket.id,ans})
    })
});

