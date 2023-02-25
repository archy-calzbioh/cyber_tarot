//requirements
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
//set views directory
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//models
const tarotDeck = require("./models/deck.js");
const TarotCard = require("./models/tarot.js");

//connect to mongo
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("The connection with mongod is established.");
});

console.log(tarotDeck);

//create listner
app.listen(3000, () => {
  console.log(`OI, I'm Listening Here!`);
});

// // create seed
// TarotCard.create(tarotDeck, (err, data) =>{
//     if(err) console.log(err.message);
//     console.log('The connection with mongod is established')
// })

//create index route
app.get("/", (req, res) => {
  TarotCard.find({}, (err, cards) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
    res.render("index.ejs", { cards: cards });
  });
});

// DELETE
app.post("/delete/:id/", function (req, res) {
  TarotCard.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Error deleting card");
    });
});
//new route
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

//edit route
app.get("/edit/:id", (req, res) => {
   res.render("edit.ejs", { data: req.params.id });
});


// SHOW
app.get("/:id", (req, res) => {
  TarotCard.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
    }
    res.render("show.ejs", { data: item });
  });
});

//take tarot form data
app.post("/submit", (req, res) => {
  const card = new TarotCard({
    name: req.body.name,
    suit: req.body.suit,
    number: parseInt(req.body.number),
    upright: req.body.upright,
    reversed: req.body.reversed,
    img: req.body.img,
  });
  card.save();
  res.redirect("/");
});

//update
app.post("/update/:id/", function (req, res) {
  TarotCard.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        suit: req.body.suit,
        number: parseInt(req.body.number),
        upright: req.body.upright,
        reversed: req.body.reversed,
        img: req.body.img,
      },
    },
    { new: true }
  )
    .then((card) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Error updating card");
    });
});