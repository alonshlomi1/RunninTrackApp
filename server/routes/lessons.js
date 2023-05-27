const express = require('express')
const router = express.Router()
const Lessons = require('../models/lessons')

const max_students_group = 3
/**
 * GET /lessons
 * Get all lessons
 */
router.get('/', async (req, res) => {
    try{
        const lessons = await Lessons.find()
        res.json(lessons)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * GET /lessons/available/:start/:end
 * Get available to register lessons within a specified time range
 */
router.get('/available/:start/:end', async (req, res) => {
    try{
        const lessons = await Lessons.find({ available_to_reg : { $eq : true },
            start_time: {
                $gte: req.params.start,
                $lt: req.params.end
            }})
        res.json(lessons)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * GET /lessons/:id/:start/:end
 * Get lessons for a specific instructor or student within a specified time range
 */
router.get('/:id/:start/:end', async (req, res) => {
    try{
        const lessons = await Lessons.find({ $or: [
            { instructor: req.params.id },
            { students: req.params.id }
          ],start_time: {
            $gte: req.params.start,
            $lt: req.params.end
        }})
        res.json(lessons)
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * POST /lessons
 * Create a new lesson
 */
router.post('/', async (req, res) => {
    const lessons = new Lessons({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        is_individual: req.body.is_individual,
        instructor: req.body.instructor,
        students: req.body.students
    })
    try{
        const newLessons = await lessons.save()
        res.status(201).json(newLessons)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * POST /lessons/group
 * Create multiple lessons
 */
router.post('/group', async (req, res) => {
    const lessonList = []
    for (const lesson in req.body){

        lessonList.push(new Lessons({
            start_time: new Date(req.body[lesson].start_time),
            end_time: new Date(req.body[lesson].end_time),
            instructor: req.body[lesson].instructor,
            is_individual: req.body[lesson].is_individual
        }))
    }
    try{
        const resLessonList = []
        for (lesson in lessonList){
            resLessonList.push(await lessonList[lesson].save())
        }
        res.status(201).json(resLessonList)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * GET /lessons/:id
 * Get a specific lesson by ID
 */
router.get('/:id', getLesson, (req, res) => {
    res.send(res.lesson)
})
/**
 * PATCH /lessons/:id
 * Update a specific lesson by ID
 */
router.patch('/:id', getLesson, checkLesson, async (req, res) => {
    if (req.body.start_time != null){
        res.lesson.start_time = req.body.start_time
    }
    if (req.body.end_time != null){
        res.lesson.end_time = req.body.end_time
    }
    if (req.body.is_individual != null){
        res.lesson.is_individual = req.body.is_individual
    }
    if (req.body.instructor != null){
        res.lesson.instructor = req.body.instructor
    }
    if (req.body.students != null){
        res.lesson.students.push(req.body.students)
    }
    try{
        const updateLesson = await res.lesson.save()
        res.json(updateLesson)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})

/**
 * DELETE /lessons/:id
 * Delete a specific lesson by ID
 */
router.delete('/:id', getLesson, async (req, res) => {
    try{
        await Lessons.findByIdAndDelete(res.lesson.id)
        res.json({massage: 'Deleted Lessons'})
    }
    catch(err){
    res.status(500).json({massage: err.massage})
    }
})

/**
 * Middleware: getLesson
 * Description: Get a specific lesson by ID
 */
async function getLesson(req, res, next) {
    let lesson
    try{
        lesson = await Lessons.findById(req.params.id)
        if (lesson == null){
            return res.status(404).json({massage: 'Cannot find Lessons'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.lesson= lesson
    next()
}
/**
 * Middleware: checkLesson
 * Description: Check if a lesson should keep being available for registration after this registration
 */
async function checkLesson(req, res, next) {
    if( res.lesson.is_individual || res.lesson.students.length + 1 == max_students_group){
        res.lesson.available_to_reg = false
    }
    next()
}
module.exports = router