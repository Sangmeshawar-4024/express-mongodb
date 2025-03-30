const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost/userdatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongodb connect success"))
.catch(err=>console.error("mongodb connect error",err))
const userSchema = new mongoose.Schema({
    name:{type: 'string', required: true},
    email:{type: 'string', required: true,unique:true},
    age:{type: 'number'},
    address:{type: 'string'}

},{timestamps:true})

const User = mongoose.model('User', userSchema)

app.get('/users', async (req, res) => {
    const users = await User.find({},'name email')
    res.send(users)
})

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})