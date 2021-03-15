const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const http = require('http').createServer(app)
// const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 8080

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({extended:true}))


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/fanfic', require('./routes/fanfic.routes'))
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/user', require('./routes/user.routes'))
if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static(path.join(__dirname,'client','build')))
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
 function socketMesage(){
    try {
       io.on('connection',socket =>{
        socket.on('message',({name,comment})=>{
          io.emit('message',{name,comment})
          
        })
      })
      
      
    } catch (e) {
        
    }
   
}
// socketMesage()
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        })
       
        
    } catch (e) {
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

start()
http.listen(port,() =>{console.log(`App started on port ${port} ...`)})
