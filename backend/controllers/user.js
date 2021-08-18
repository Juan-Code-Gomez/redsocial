const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res)=>{
    if(!req.body.name || !req.body.email || !req.body.password) return res.status(400).send("Process Failed: Incomplete data");

    let existingUser = await User.findOne({email:req.body.email}); if (existingUser) return res.status(400).send("Process Failed: the email user is already registered");

    let hash = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    let result = await user.save(); if (!result) return res.status(400).send("Failed to register user");

    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (e) {
        return res.status(400).send("Failed to register user");
    }
}

const listUser = async (req, res) => {
    const user = await User.find()
    if(!user || user.length ===0) return res.status(401).send("No User")
    return res.status(200).send({user})
};


module.exports = {registerUser, listUser};