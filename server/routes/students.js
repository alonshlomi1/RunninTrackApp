const express = require('express')
const router = express.Router()
const Students = require('../models/students')

/**
 * Route: GET /students
 * Description: Get all students
 */
router.get('/', async (req, res) => {
    try{
        const students = await Students.find()
        res.json(students)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * Route: POST /students
 * Description: Create a new student
 */
router.post('/', async (req, res) => {
    const student = new Students({
        name: req.body.name,
        birthdate: new Date(req.body.birthdate),
        gender: req.body.gender
    })
    try{
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * Route: GET /students/:id
 * Description: Get a specific student by ID
 */
router.get('/:id', getStudent, (req, res) => {
    res.send(res.student)
})

/**
 * Route: PATCH /students/:id
 * Description: Update a student by id
 */
router.patch('/:id', getStudent, async (req, res) => {
    if (req.body.name != null){
        res.instructor.name = req.body.name
    }
    if (req.body.gender != null){
        res.instructor.gender = req.body.gender
    }
    if (req.body.birthdate != null){
        res.instructor.birthdate = req.body.birthdate
    }
    if (req.body.trainings != null){
        res.instructor.trainings = req.body.trainings
    }
    try{
        const updateStudent = await res.student.save()
        res.json(updateStudent)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * Route: DELETE /students/:id
 * Description: Delete a specific student
 */
router.delete('/:id', getStudent, async (req, res) => {
    try{
        await Students.findByIdAndDelete(res.student.id)
        res.json({massage: 'Deleted Student'})
    }
    catch(err){
    res.status(500).json({massage: err.massage})
    }
})
/**
 * Middleware: getStudent
 * Description: Retrieve a student by ID
 */
async function getStudent(req, res, next) {
    let student
    try{
        student = await Students.findById(req.params.id)
        if (student == null){
            return res.status(404).json({massage: 'Cannot find Student'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.student= student
    next()
}

module.exports = router