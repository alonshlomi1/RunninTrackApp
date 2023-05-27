const mongoose = require('mongoose')

// Defining the instuctorsSchema using the Mongoose Schema class
const instuctorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: false
    },
    seniority: {
        type: Number,
        required: false
    },
    lessons:{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    availability:[mongoose.Schema.Types.ObjectId]
})

// Creating a model based on the instuctorsSchema 
// Exporting the Users model 
module.exports = mongoose.model("Instructors", instuctorsSchema)