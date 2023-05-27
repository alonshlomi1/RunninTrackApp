const mongoose = require('mongoose')

// Defining the studentsSchema using the Mongoose Schema class
const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    trainings:{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
})
// Creating a model based on the studentsSchema 
// Exporting the Users model 
module.exports = mongoose.model("Students", studentsSchema)