require('dotenv').config()
const express = require("express")
const dbConnection = require("./src/config/dbconfig")
const router = require("./src/route")


const app = express()
const port = process.env.PORT || 4000
//database connection
dbConnection()

// http://localhost:3000

//router middleware
app.use(router)

// page not found middleware

app.use((req,res) =>{
  return res.status(404).json({message: "route not found"})
})

app.listen(port, ()=>{
    console.log(`server is running port number ${port}`)
})