// import express
const express = require("express")
// import morgan
const morgan = require("morgan")
// import method override
const methodOverride = require("method-override")

// import our fruits
// require will return the value of module.exports
const fruits = require("./models/fruits.js")

// create our app object
const app = express()

//******************
//MIDDLEWARE
//****************** 
app.use(express.static("public")) // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js

// express.urlencoded (parse url encoded bodies)
// add the data to req.body
// used to read the form submitted through the NEW route
app.use(express.urlencoded({extended: true}))

// morgan - log data about each request for debugging
app.use(morgan("dev"))

// methodOverride - allows to override FORM POST requests
// as a different method like PUT or DELETE
// It will look for a _method url query
app.use(methodOverride("_method"))




//******************
//ROUTES
//****************** 

// fruits INDEX route
// get request to /fruits
// return all fruits
app.get("/fruits", (req, res) => {
    // res.send(fruits)
    // "index.ejs" => "./views/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("index.ejs", {fruits})
})

// NEW Route - render a page with a form
// GET request to /fruits/new
// allow us to have a form to create a new fruit
app.get("/fruits/new", (req, res) => {

    // render a template with our form
    res.render("new.ejs")  // new.ejs => ./views/ + new.js
})


// CREATE ROUTE - Receives the FORM data and creates the fruit
// POST request /fruits
// create a fruit from the form data, then redirect back to index
app.post("/fruits", (req, res) => {
    // get the form data from the request
    const body = req.body   // requests have a header and a body, getting the body of the request here

    //send back the form data as JSON
    // res.send(body)

    //convert the 'readyToEat' to true or false, because clicking the checkbox sends over readyToEat as 'on' or doesn't send the readyToEat param at all if checkbox is unchecked
    if (body.readyToEat === 'on') 
    {
        body.readyToEat = true
    }
    else {
        body.readyToEat = false
    }

    // add the fruit to the array
    fruits.push(body)

    // redirect them back to index page
    res.redirect("/fruits")
})

// DESTROY ROUTE -  Deletes a fruit
// DELETE request to /fruits/:id
// delete the specified fruit, redirects to index
app.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // then we'll splice it from the array
    // arr.splice(index, numOfItemToCut)
    fruits.splice(id, 1)   // cut 1 item out from index=id

    // redirect back to index
    res.redirect("/fruits")
})

// EDIT ROUTE - render a Form to Edit a specified fruit
// GET to /fruits/:id/edit
// render a FORM with the exisiting values filled in
app.get("/fruits/:id/edit", (req, res) => {

    // get id from the params
    const id = req.params.id

    // get the fruit being updated
    const fruit = fruits[id]

    // send the id and the fruit over to the template
    res.render("edit.ejs", {fruit, id} )// edit.ejs => ./views/edit.ejs
})

// UPDATE ROUTE - Receive the form data, updates the fruit
// PUT to /fruits/:id
// Update the specified fruit, then redirect to index
app.put("/fruits/:id", (req, res) => {
    // get the id
    const id = req.params.id
    // get the body
    const body = req.body
    // convert readyToEat to true or false
    if(body.readyToEat === "on"){
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }
    // swap the old version with the new version
    fruits[id] = body
    // redirect back to the index page
    res.redirect("/fruits")
})


// fruits SHOW route
// get request to /fruits/:id
// return a single fruit
app.get("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "show.ejs" =>  ./views/show.ejs
    res.render("show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})