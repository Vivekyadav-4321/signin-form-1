const express = require('express')
const app = express()
const userAPI = require('./userlistAPI')
const userDB = require("./userDB")
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/signin.html')
})
app.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/index.css')

})
app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/register.html')
})

app.post('/sigin', (req, res) => {
    userDB.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
        console.log(user);
        if (user) {
            res.cookie('userinfo', user)
            res.redirect("/dashboard")
        } else {
            res.redirect("/")
        }

    }).catch((err) => {
        console.log(err);
    })
})

app.post('/register', (req, res) => {
    userDB(req.body).save().then((data) => {
        res.cookie('userinfo', data)
        res.redirect("/dashboard")
    }).catch((err) => {
        console.log(err);
    })

})
app.get("/dashboard", (req, res) => {
    const {email, password} = req.cookies.userinfo
    userDB.findOne({ email, password }).then((user) => {
        if (user) {
            res.sendFile(__dirname + '/dashboard.html')
        } else {
            res.redirect("/")
        }

    }).catch((err) => {
        console.log(err);
    })
})


app.get("/user-list", (req, res) => {
    userDB.findOne({ email: req.body.email, password: req.body.password }, { password: 0 }).then((user) => {
        if (user) {
            res.sendFile(__dirname + '/dashboard.html')
        } else {
            userDB.find().then((data) => {
                res.json(data)
            })
        }

    }).catch((err) => {
        console.log(err);
    })


})

app.listen(3000, () => {
    console.log("listening on 3000");
})