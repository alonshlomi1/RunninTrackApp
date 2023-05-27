const mongoose = require('mongoose')

// Defining the lessonsSchema using the Mongoose Schema class
const lessonsSchema = new mongoose.Schema({
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    is_individual: {
        type: Boolean,
        required: false
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    students:{
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    available_to_reg:{
        type: Boolean,
        required: false,
        default: true
    }
})

// Creating a model based on the lessonsSchema 
// Exporting the Users model 
module.exports = mongoose.model("Lessons", lessonsSchema)