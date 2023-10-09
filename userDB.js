const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log("connect to mongoDB local");
}).then((err)=>{
    console.log("userDB: " + err);
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
},{timestamps: true})


const userDB = mongoose.model("user", userSchema)

module.exports = userDB