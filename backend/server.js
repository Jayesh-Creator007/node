const express = require('express')
const app = express()
//ENV
require('dotenv').config()

app.use(express.urlencoded())
app.use(express.json())
//Port
const PORT = process.env.PORT|| 3000
//Mongodb
const db= require('./config/db')
db.Configdb()

//Routing 
const categoryRoute = require('./router/category.route')
const taskRoute = require('./router/task.route')
const userRoute= require('./router/user.route')




//Calling the routing

app.use('/api/category',categoryRoute)
app.use('/api/task',taskRoute)
app.use('/api/user',userRoute)



app.use('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(PORT,()=>{
    console.log(`Server started http://localhost:${PORT}`);
})