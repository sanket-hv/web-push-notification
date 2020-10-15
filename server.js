const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()


//set static path
app.use(express.static(path.join(__dirname, "client")))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const publicVapidKey = 'BApztuqSd7pj5XsAv6oNuvAx0ampEqJ0B-UeQonvL2y7iyrUIVwalgW0xPncMYb_IkWJJjDZWD93iFeUR5bcmEs'
const privateVapidKey = 'aTYXLFqiG3kEAgFXG2dpCQKkhRV8N5mf4VhlTzhz9Hc'

webpush.setVapidDetails('mailto:sankethv8509@gmail.com', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res) => {
    //get pushSubscription object
    const subsciption = req.body

    //send 201- resource created
    res.status(201).json({})

    //create payload
    const payload = JSON.stringify({ 'title': 'Push Test By Sanket Vanani!' });

    //Pass object into send notification
    webpush.sendNotification(subsciption, payload).catch(error => console.log(error));
})

const port = 8000

app.listen(8000, () => console.log("Server runnnig on port " + port))
