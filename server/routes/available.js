const express = require('express')
const router = express.Router()
const Available = require('../models/available')

// Route: GET '/'
// Description: Get all available time slots
router.get('/', async (req, res) => {
    try{
        const available = await Available.find()
        res.json(available)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
// Route: GET '/:instructorid/:start/:end'
// Description: Get available time slots for a specific instructor and time range
router.get('/:instructorid/:start/:end', async (req, res) => {
    try{
        const available = await Available.find({ instructor : { $eq : req.params.instructorid },
                                                            start_time: {
                                                                $gte: req.params.start,
                                                                $lt: req.params.end
                                                            }})
        res.json(available)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
// Route: POST '/'
// Description: Creates a new available time slot
router.post('/', async (req, res) => {
    const available = new Available({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        instructor: req.body.instructor
    })
    try{
        const newAvailable = await available.save()
        res.status(201).json(newAvailable)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
// Route: POST '/group'
// Description: Creates multiple available time slots
router.post('/group', async (req, res) => {
    const availableList = []
    for (const available in req.body.group){
        availableList.push(new Available({
            start_time: req.body.group[available].start_time,
            end_time: req.body.group[available].end_time,
            instructor: req.body.group[available].instructor
        }))
    }
    try{
        const resAvailableList = []
        for (available in availableList){
            console.log(available)
            console.log(availableList[available])
            resAvailableList.push(await availableList[available].save())
        }
        
        res.status(201).json(resAvailableList)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
// Route: GET '/:id'
// Description: Get a specific available time slot by ID
router.get('/:id', getAvailable, (req, res) => {
    res.send(res.available)
})
// Route: PATCH '/:id'
// Description: Updates a specific available time slot by ID
router.patch('/:id', getAvailable, async (req, res) => {
    if (req.body.start_time != null){
        res.available.start_time = req.body.start_time
    }
    if (req.body.end_time != null){
        res.available.end_time = req.body.end_time
    }
    if (req.body.instructor != null){
        res.available.instructor = req.body.instructor
    }
    try{
        const updateAvailable = await res.available.save()
        res.json(updateAvailable)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
// Route: DELETE '/:id'
// Description: Deletes a specific available time slot by ID
router.delete('/:id', getAvailable, async (req, res) => {
    try{
        await Available.findByIdAndDelete(res.available.id)
        res.json({massage: 'Deleted Available'})
    }
    catch(err){
    res.status(500).json({massage: err.massage})
    }
})

/**
 * Middleware: getAvailable
 * Description: Get available time slot by ID
 */
async function getAvailable(req, res, next) {
    let available
    try{
        available = await Available.findById(req.params.id)
        if (available == null){
            return res.status(404).json({massage: 'Cannot find instructor'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.available= available
    next()
}


module.exports = router