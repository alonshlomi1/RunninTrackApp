const mongoose = require('mongoose')

// Defining the availableSchema using the Mongoose Schema class
const availableSchema = new mongoose.Schema({
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }    
})

// Creating a model based on the availableSchema 
// Exporting the Users model 
module.exports = mongoose.model("Available", availableSchema)