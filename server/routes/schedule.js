const express = require('express')
const router = express.Router()
const Available = require('../models/available')

const lesson_duration = 0.5 // in hours
const hour = 60 * 60 * 1000; // in milliseconds

/**
 * Route: POST /available
 * Description: Calculate the optional schedule for the next week based on available time slots
 */
router.get('/:start/:end', getAllAvailableSorted, getSchedule, (req, res) => {
    try{
        res.json(res.schedule)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})

/**
 * Middleware: getAllAvailableSorted
 * Description: Retrieve all available time slots for the given week and sort them by start time
 */
async function getAllAvailableSorted(req, res, next) {
    let availableList
    try{
        availableList = await Available.find({
            start_time: {
                $gte: req.params.start,
                $lt:req.params.end
            }
        }).sort({"start_time": 1}) 
        if (availableList == null){
            return res.status(404).json({massage: 'Cannot find any Available'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.availableList= availableList
    next()
}
/**
 * Middleware: getSchedule
 * Description: Calculate the schedule based on available time slots and lesson duration
 */
function getSchedule(req, res, next) {
    let current_time

    // Set the initial current time to the start time of the first available time slot
    if(res.availableList[0])
        current_time = res.availableList[0].start_time
    let schedule = []
    //TODO: extend to number of schedules
    
    res.availableList.forEach(available => {
        // Check if the end time of the available time slot is after the current time
        if(new Date(available.end_time) >= new Date(current_time)){
            // If: the start time of the available time slot is before the current time,
            // Then: update the start time to the current time
            if (new Date(available.start_time) <= new Date(current_time)){
                available.start_time = new Date(current_time)}

            // Generate the schedule by cutting the available time slot 
            // to creat new time slots with the specified lesson duration
            // Runs until there's not enough time in the time slot for a full lesson
            while((Math.abs( available.end_time -available.start_time) / 36e5)>=lesson_duration){
                const newAvailable = new Available({
                    start_time: available.start_time,
                    end_time: new Date(available.start_time.getTime() + lesson_duration * hour),
                    instructor: available.instructor,
                }) 
                // Add the new cut lesson duration time slot to the schedule
                schedule.push(newAvailable)
                
                // Update the start time for the next iteration
                available.start_time = new Date(available.start_time.getTime() + lesson_duration * hour)
            }
            
            // Update the current time to the start time of the next available time slot
            current_time = available.start_time
        }
    });

    res.schedule= schedule
    next()
}
module.exports = router