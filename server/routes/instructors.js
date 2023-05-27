const express = require('express')
const router = express.Router()
const Instructors = require('../models/instuctors')

/**
 * Route: GET /instuctors
 * Description: Get all instuctors
 */
router.get('/', async (req, res) => {
    try{
        const instructors = await Instructors.find()
        res.json(instructors)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * Route: POST /instuctors
 * Description: Create a new instuctor
 */
router.post('/', async (req, res) => {
    const instructor = new Instructors({
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        seniority: req.body.seniority
    })
    try{
        const newInstructor = await instructor.save()
        res.status(201).json(newInstructor)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * Route: GET /instuctors/:id
 * Description: Get a specific instuctor by ID
 */
router.get('/:id', getInstructor, (req, res) => {
    res.send(res.instructor)
})
/**
 * Route: PATCH /instuctors/:id
 * Description: Update a instuctor by id
 */
router.patch('/:id', getInstructor, async (req, res) => {
    if (req.body.name != null){
        res.instructor.name = req.body.name
    }
    if (req.body.gender != null){
        res.instructor.gender = req.body.gender
    }
    if (req.body.birthdate != null){
        res.instructor.birthdate = req.body.birthdate
    }
    if (req.body.seniority != null){
        res.instructor.seniority = req.body.seniority
    }
    if (req.body.availability != null){
        res.instructor.availability = req.body.availability
    }
    if (req.body.lessons != null){
        res.instructor.lessons = req.body.lessons
    }
    try{
        const updateInstructor = await res.instructor.save()
        res.json(updateInstructor)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * Route: DELETE /instuctors/:id
 * Description: Delete a specific instuctor
 */
router.delete('/:id', getInstructor, async (req, res) => {
    try{
        await Instructors.findByIdAndDelete(res.instructor.id)
        res.json({massage: 'Deleted Instructor'})
    }
    catch(err){
    res.status(500).json({massage: err.massage})
    }
})

/**
 * Middleware: getInstructor
 * Description: Retrieve a instuctor by ID
 */
async function getInstructor(req, res, next) {
    let instructor
    try{
        instructor = await Instructors.findById(req.params.id)
        if (instructor == null){
            return res.status(404).json({massage: 'Cannot find instructor'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.instructor= instructor
    next()
}


module.exports = router