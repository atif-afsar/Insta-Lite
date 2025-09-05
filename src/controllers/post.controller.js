const postModel = require("../models/post.model");
const { generateCaption } = require("../service/ai.service");
const { uploadFile } = require("../service/srorage.service");
const { v4: uuidv4 } = require('uuid');


async function createPostController(req, res){
    const file = req.file;
    console.log("File received:", file);

    const base64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);
    
    const post = await postModel.create({
        image: result.url,
        caption,
        user: req.user._id
    });
    return res.status(201).json({message:"Post created successfully", post})
}

module.exports = {createPostController}