const express= require("express");
const {dbConnection} = require("./db/db");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT,()=>
console.log("Backend server running OK, on port:", process.env.PORT)
);

dbConnection();