const express= require("express");
const cors = require("cors");
const {dbConnection} = require("./db/db");
const User = require("./routers/user");
const Post = require("./routers/post");
const Auth = require("./routers/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", User);
app.use("/api/auth/", Auth);
app.use("/api/post", Post);

app.listen(process.env.PORT,()=>
console.log("Backend server running OK, on port:", process.env.PORT)
);

dbConnection();