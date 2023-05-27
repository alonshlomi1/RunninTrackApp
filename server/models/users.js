const mongoose = require('mongoose')

// Defining the usersSchema using the Mongoose Schema class
const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    object:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }     
})

// Creating a model based on the usersSchema 
// Exporting the Users model 
module.exports = mongoose.model("Users", usersSchema)