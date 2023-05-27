const express = require('express')
const router = express.Router()
const Available = require('../models/available')
const Instructors = require('../models/instuctors')
const Lessons = require('../models/lessons')
const Students = require('../models/students')
const Users = require('../models/users')


router.get('/',deleteAll, addStudents, addInstructors, addUsers, addAvailable, async (req, res) => {
    try{
        res.status(200).json({massage: "reset DB"})
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})


async function deleteAll(req, res, next) {
    let result
    try{
        result = await Available.deleteMany({});
        console.log("deleteAvailable")
        result = await Instructors.deleteMany({});
        console.log("deleteInstructors")
        result = await Lessons.deleteMany({});
        console.log("deleteLessons")
        result = await Students.deleteMany({});
        console.log("deleteStudents")
        result = await Users.deleteMany({});
        console.log("deleteUsers")
        next()
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
}

async function addStudents(req, res, next) {
    const student1 = new Students({
        name: "Alon Shlomi",
        birthdate: new Date("1995-07-16T02:13:33.959Z"),
        gender: "Male"
    })
    const student2 = new Students({
        name: "Coral Cohen",
        birthdate: new Date("1998-02-10T02:13:33.959Z"),
        gender: "Female"
    })
    try{
        res.newStudent1 = await student1.save()
        res.newStudent2 = await student2.save()
        console.log("SavedStudents")
        next()
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
}

async function addInstructors(req, res, next) {
    const instructor1 = new Instructors({
        name: "Yosi Cohen",
        gender: "Male",
        birthdate: "1995-07-16T02:13:33.959Z",
        seniority: 5
    })
    const instructor2 = new Instructors({
        name: "Elad Levi",
        gender: "Male",
        birthdate: "1997-10-19T02:13:33.959Z",
        seniority: 2
    })
    const instructor3 = new Instructors({
        name: "Sharon Yam",
        gender: "Female",
        birthdate: "2000-09-16T02:13:33.959Z",
        seniority: 1
    })
    try{
        res.newInstructor1 = await instructor1.save()
        res.newInstructor2 = await instructor2.save()
        res.newInstructor3 = await instructor3.save()
        console.log("SavedInstructors")
        next()
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
    
}

async function addUsers(req, res, next) {
    const user1 = new Users({
        email: "s1@gmail.com",
        password: "123",
        type: "student",
        object: res.newStudent1
    })
    const user2 = new Users({
        email: "s2@gmail.com",
        password: "123",
        type: "student",
        object: res.newStudent2
    })
    const user3 = new Users({
        email: "i1@gmail.com",
        password: "123",
        type: "admin",
        object: res.newInstructor1
    })
    const user4 = new Users({
        email: "i2@gmail.com",
        password: "123",
        type: "instructor",
        object: res.newInstructor1
    })
    const user5 = new Users({
        email: "i3@gmail.com",
        password: "123",
        type: "instructor",
        object: res.newInstructor1
    })
    try{
         res.newUser1 = await user1.save()
         res.newUser2 = await user2.save()
         res.newUser3 = await user3.save()
         res.newUser4 = await user4.save()
         res.newUser5 = await user5.save()
         console.log("SavedUsers")
         next()
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
    
}

async function addAvailable(req, res, next) {
    const available1 = new Available({
        start_time: "2023-05-28T01:00:00.000Z",
        end_time: "2023-05-28T05:00:00.000Z",
        instructor: res.newInstructor1
    })
    const available2 = new Available({
        start_time: "2023-05-28T07:00:00.000Z",
        end_time: "2023-05-28T10:00:00.000Z",
        instructor: res.newInstructor1
    })
    const available3 = new Available({
        start_time: "2023-05-29T05:00:00.000Z",
        end_time: "2023-05-29T10:00:00.000Z",
        instructor: res.newInstructor1
    })
    const available4 = new Available({
        start_time: "2023-05-30T05:00:00.000Z",
        end_time: "2023-05-30T10:00:00.000Z",
        instructor: res.newInstructor1
    })
    const available5 = new Available({
        start_time: "2023-05-31T05:00:00.000Z",
        end_time: "2023-05-31T10:00:00.000Z",
        instructor: res.newInstructor1
    })
    const available6 = new Available({
        start_time: "2023-05-29T06:00:00.000Z",
        end_time: "2023-05-29T12:00:00.000Z",
        instructor: res.newInstructor2
    })
    const available7 = new Available({
        start_time: "2023-05-30T06:00:00.000Z",
        end_time: "2023-05-30T12:00:00.000Z",
        instructor: res.newInstructor2
    })
    const available8 = new Available({
        start_time: "2023-06-01T01:00:00.000Z",
        end_time: "2023-06-01T05:00:00.000Z",
        instructor: res.newInstructor2
    })
    const available9 = new Available({
        start_time: "2023-06-01T07:00:00.000Z",
        end_time: "2023-06-01T12:00:00.000Z",
        instructor: res.newInstructor3
    })
    const available10 = new Available({ 
        start_time: "2023-06-02T07:00:00.000Z",
        end_time: "2023-06-02T12:00:00.000Z",
        instructor: res.newInstructor3
    })
    const available11 = new Available({
        start_time: "2023-06-03T07:00:00.000Z",
        end_time: "2023-06-03T12:00:00.000Z",
        instructor: res.newInstructor3
    })
    try{

        res.newAvailable1 = await available1.save()
        res.newAvailable2 = await available2.save()
        res.newAvailable3 = await available3.save()
        res.newAvailable4 = await available4.save()
        res.newAvailable5 = await available5.save()
        res.newAvailable6 = await available6.save()
        res.newAvailable7 = await available7.save()
        res.newAvailable8 = await available8.save()
        res.newAvailable9 = await available9.save()
        res.newAvailable10 = await available10.save()
        res.newAvailable11 = await available11.save()
        console.log("SavedAvailable")
        next()
    }
    catch(err){

        res.status(400).json({massage: err.massage})
    }
}


module.exports = router