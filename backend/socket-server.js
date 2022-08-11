const app=require('express')();
const server=require('http').createServer(app);
const Chat=require("./models/chat");
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
    console.log("Connected to DB");
  });
const io=require('socket.io')(server,{
    cors:{
        origin:"*"
    }
});
io.use((socket,next)=>{
    console.log("I am middleware");
    next();
})
io.on("connection", (socket)=> {
    socket.on("joinRoom",async(id)=>{
        console.log(id);
        socket.join(id.id);
        let chat=await Chat.findById(id.id);
        io.emit(id.id,chat.messages);
        socket.on(id.id,async (payload)=>{
            if(payload.type==="send-message")
            {
                
                let chat=await Chat.findById(id.id);
                let obj={};
                obj.text=payload.text;
                obj.user=payload.user;
                chat.messages.push(obj);
                await chat.save();
                io.emit(id.id,{type:"message",prev:chat.messages});
            }
            if(payload.type==="delete-message"){
                let chat=await Chat.findById(id.id);
                let index=chat.messages.indexOf(payload.id);
                if (index > -1) { // only splice array when item is found
                    chat.messages.splice(index, 1); // 2nd parameter means remove one item only
                }
                await chat.save();
                io.emit(id.id,{type:"delete",id:payload.id});
            }
        });
    })
    socket.on("createRoom",async (payload)=>{
        let chat=new Chat(payload);
        console.log(chat);
        await chat.save();
        socket.on(chat._id,(payload)=>{
            console.log(payload);
            io.emit(chat._id,{payload,sid:socket.id});
            console.log(chat._id);
        })
    })
    console.log("Connected Succesfully")
});

server.listen(8000);