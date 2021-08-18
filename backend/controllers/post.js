const Post = require("../models/post");


const registerPost = async (req, res)=>{
    if(!req.body.text || !req.body.hashtag) return res.status(400).send("Process Failed: Incomplete data");

    const post = new Post({ 
        userId: req.user._id,
        text: req.body.text,
        hashtag: req.body.hashtag,
      });

    let result = await post.save();
    if(!result )return res.status(400).send("Failed to register post")
    return res.status(200).send({result});
}

module.exports={registerPost}