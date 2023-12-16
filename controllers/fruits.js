// import express
const express = require('express')

// import the fruits data
const fruits = require("../models/fruits.js")

// create a router
const router = express.Router()


//******************
//ROUTES
//****************** 

// fruits INDEX route
// get request to /fruits
// return all fruits
// "/fruits" is implied from the router, so we need just /
router.get("/", (req, res) => {
    // res.send(fruits)
    // "fruits/index.ejs" => ./views/ + fruits/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("fruits/index.ejs", {fruits})
})

// NEW Route - render a page with a form
// GET request to /fruits/new
// allow us to have a form to create a new fruit
// "/fruits" is implied from the router, so we need just /new
router.get("/new", (req, res) => {

    // render a template with our form
    res.render("fruits/new.ejs")  // fruits/new.ejs => ./views/ + fruits/new.js
})


// CREATE ROUTE - Receives the FORM data and creates the fruit
// POST request /fruits
// create a fruit from the form data, then redirect back to index
// "/fruits" is implied from the router, so we need just /
router.post("/", (req, res) => {
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
// "/fruits" is implied from the router, so we need just /:id
router.delete("/:id", (req, res) => {
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
// "/fruits" is implied from the router, so we need just /:id/edit
router.get("/:id/edit", (req, res) => {

    // get id from the params
    const id = req.params.id

    // get the fruit being updated
    const fruit = fruits[id]

    // send the id and the fruit over to the template
    res.render("fruits/edit.ejs", {fruit, id} )// fruits/edit.ejs => ./views/fruits/edit.ejs
})

// UPDATE ROUTE - Receive the form data, updates the fruit
// PUT to /fruits/:id
// Update the specified fruit, then redirect to index
// "/fruits" is implied from the router, so we need just /:id
router.put("/:id", (req, res) => {
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
// "/fruits" is implied from the router, so we need just /:id
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "fruits/show.ejs" =>  ./views/fruits/show.ejs
    res.render("fruits/show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})


// EXPORT THE ROUTER
module.exports = router