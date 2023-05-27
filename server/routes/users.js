const express = require('express')
const router = express.Router()
const Users = require('../models/users')

/**
 * Route: POST /users
 * Description: Create a new user
 */
router.post('/', async (req, res) => {
    try{
        let user = await Users.find({ email : { $eq : req.body.email } })
        if (user != null){
            return res.status(409).json({massage: 'Email'})
        }
        user = new Users({
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
            object: req.body.object
        })
        console.log(user)
        const newUser = await user.save()
        res.status(201).json(newUser)    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * Route: POST /users/login
 * Description: Authenticate a user login
 */
router.post('/login', async (req, res) => {
    let user
    try{
        user = await Users.findOne({ email : { $eq : req.body.email },
                                    password : { $eq : req.body.password } })
        console.log(user)
        if (user == null){
            return res.status(404).json({massage: 'Cannot find User'})
        }
        else{
            return res.status(200).json(user)
        }
    }
    catch (err){
        res.status(500).json({massage: err.massage})
    }
})
/**
 * Route: PATCH /users/:id
 * Description: Update a user
 */
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null){
        res.user.email = req.body.email
    }
    if (req.body.password != null){
        res.user.password = req.body.password
    }
    if (req.body.type != null){
        res.user.type = req.body.type
    }
    if (req.body.object != null){
        res.user.object = req.body.object
    }
    try{
        const updateUser = await res.user.save()
        res.json(updateUser)
    }
    catch(err){
        res.status(400).json({massage: err.massage})
    }
})
/**
 * Middleware: getUser
 * Description: Retrieve a user by ID
 */
async function getUser(req, res, next) {
    let user
    try{
        user = await Users.findById(req.params.id)
        if (user == null){
            return res.status(404).json({massage: 'Cannot find User'})
        }
    }
    catch (err){
        return res.status(500).json({massage: err.massage})
    }
    res.user= user
    next()
}
module.exports = router