require('dotenv').config()
const express = require("express")
const dbConnection = require("./src/config/dbconfig")
const router = require("./src/route")
const errorHandlingMiddleware = require('./src/utils/errorhandling')
const pathNotFound = require('./src/utils/pathnotfound')


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.static("uploads"))

//database connection
dbConnection()

// http://localhost:3000

//router middleware
app.use(router)

// page not found middleware

// app.use(pathNotFound);

app.use(errorHandlingMiddleware); 

app.listen(port, ()=>{
    console.log(`server is running port number ${port}`)
})