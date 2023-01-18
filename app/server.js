//!server file

// import
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000

require("dotenv").config() // so we can read the information from the secret key that is on the .env file
// console.log(`secret ${process.env.secret_key}`) //take this out later

const cookieParser = require("cookie-parser") //so that the server is able to so that the server is able to understand  the cookie info coming from the client browser


app.use(express.json())
app.use(express.urlencoded({extended:true}))
//changing cors()  to 
app.use(cors({credentials:true,origin:"http://localhost:3000"})) //credentials == able to get information from a cookie // and  the origin == where are this cookies coming from 
app.use(cookieParser())

//import the data base
require("./server/config/prestamos.config")


//import routes
require("./server/routes/user.routes")(app)
require("./server/routes/person.routes")(app)



app.listen(port,()=>console.log(`listening on port ${port}`))

//!server file end