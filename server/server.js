const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const fetch = require('node-fetch')

const cors = require('cors')





 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'luca.iran.liara.ir',
  user: 'root',
  port:"31111",
  password: '1OXbQkGsYmXk9zf7IvXCNLMm',
  database: 'chatdb'
});

connection.connect((error) => {
  if (error) return  console.log('could not Connect to MySQL database!');
  console.log('Connected to MySQL database!');
});


   
  





app.use(express.json())
app.use(cors({
  origin: '*'
}))


app.post('/contact', function(req, res){
  const body = req.body
  
  const sql = `INSERT INTO contact (fname,lname,email,subject,message) VALUES ('${body.fname}','${body.lname}','${body.email}','${body.subject}','${body.message}')` 
  connection.query(sql, [true], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
        }
        
        res.json({msg : "پیام شما با موفقیت دریافت شد."})
      });


    
 });


app.get('/contact', function(req, res){

    const sql = `SELECT * FROM contact` 
    connection.query(sql, [true], (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        
        res.json({results})
      });


     
 }); 


 app.get('/rooms', function(req, res){

   return  res.json(io.sockets.adapter.rooms)
 

     
 }); 
 app.get('/usersinroom', function(req, res){
  const roomId = req.query.room
  const clients = io.sockets.adapter.rooms[roomId];
  const numClients = clients ? clients.size : 0;
   return  res.json({clients : clients,numClients : numClients})

  
     
 });  

 
 app.get('/searchvideo', function(req, res){
  const title = req.query.title
 
  if(title !== ""){ 

    fetch(`https://www.aparat.com/etc/api/videoBySearch/text/${title}/perpage/5 `)
    .then(res=>res.json())
    .then(data=>{
     
      return res.json(data)
    })
    .catch(e=>console.log(e))
  }
  
     
 }); 
 
 app.get('/getvideobyuid', function(req, res){
  const uid = req.query.uid

  
  fetch(`https://www.aparat.com/etc/api/video/videohash/${uid}`)
  .then(res=>res.json())
  .then(data=>{
    
    return res.json(data)
  })
  .catch(e=>console.log(e))
 
     
 });  
 app.get('/getcategoryvideosbyid', function(req, res){
  const catid = req.query.catid

  
  fetch(`https://www.aparat.com/etc/api/categoryVideos/cat/${catid}}/perpage/10`)
  .then(res=>res.json())
  .then(data=>{
   
    return res.json(data)
  })
  .catch(e=>console.log(e)) 
 
     
 });  
 app.get('/getallcategories', function(req, res){


  
  fetch(`https://www.aparat.com/etc/api/categories`)
  .then(res=>res.json())
  .then(data=>{
    
    
    return res.json(data)
  })
  .catch(e=>console.log(e))
 
     
 });  
 

io.on("connection", socket => {
    
   
    socket.emit("your id", socket.id);

    socket.on("request-id",()=>{

        socket.emit("your id", socket.id);
        
    })
    socket.on("canvas",(body)=>{

      io.to(body.roomId).emit("canvas",body);
        
    }) 
  

    socket.on("sync",(body)=>{
  
        io.to(body.roomId).emit("sync",body);
        
    }) 
 
    socket.on("send message", body => {
        
        io.to(body.roomId).emit("message",body);
    })
    socket.on("send URL", body => {
     
        
        io.to(body.roomId).emit("URL",body);
    })
    socket.on("play", body => {
        
        io.to(body.roomId).emit("play",body);
    })
    socket.on("pause", body => {
       
        io.to(body.roomId).emit("pause",body);
  
    })
    socket.on("createRoom", body => {
        const roomId = Math.floor(Math.random()*90000) + 10000;
        socket.join(roomId);
        
        io.to(roomId).emit("user-joined-to-room",{roomId,joiner:socket.id});
    })
    socket.on("joinRoom", body => {
      
        socket.join(body.roomID); 
        io.to(body.roomID).emit("user-joined-to-room",{roomId:body.roomID,joiner:socket.id});
    })




    
})


server.listen(8000, () => console.log("server is running on port 8000")); 