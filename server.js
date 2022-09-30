const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs'); 

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect('mongodb+srv://foodAwayFromHome:pioneers@fafh.i7rzzcu.mongodb.net/fafh?retryWrites=true&w=majority');

const mealsrecordsSchema = {
    userId: String,
    "mealList.name": String,
    "mealList.nutritionalInfo": {String},
    occasion: String,
    mealCost: Number,
    mealDate: Date,
    // "isFAFH.state": Boolean
    isFAFH: {String}
}

const mealsrecords = mongoose.model('mealsrecords', mealsrecordsSchema);

app.get('/index', (req, res) => {
    mealsrecords.find({}, function(err, meals) {
       res.render('index', {
           mealsList: meals,
       })
   })
})

app.get("/", (req, res) => {
    res.render("login");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

app.listen(3000, function() {
   console.log('server is running');
})