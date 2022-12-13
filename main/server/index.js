// run `node index.js` in the terminal

const express = require('express');
const app = express();
var mongoose = require('mongoose');
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const Bcrypt = require("bcryptjs");
const fetch = require('node-fetch');
const XMLconvert = require('xml-js');



// Global variables and environment variables
const DATABASE = "mongodb+srv://stu039:p397262W@cluster0.wenbhsm.mongodb.net/stu039";
const PORT = 4000;
const XML = "https://www.lcsd.gov.hk/datagovhk/event/events.xml";

// DB Connection
mongoose.connect(DATABASE);
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");

  // Schemas
  const UserSchema = mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    userAc: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
  });
  const User = mongoose.model('User', UserSchema);

  const CommentSchema = mongoose.Schema({
    commentId: { type: Number, required: true, unique: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, Default: Date.now, required: true },
    content: { type: String, required: true },
  });
  const Comment = mongoose.model('Comment', CommentSchema);

  const EventSchema = mongoose.Schema({
    eventId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    date: { type: Date, required: true },
    description: { type: String },
    presenter: { type: String, required: true },
    price: { type: Number, required: true }
  });
  const Event = mongoose.model('Event', EventSchema);

  const LocationSchema = mongoose.Schema({
    locationId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true}
    }
  });
  const Location = mongoose.model('Location', LocationSchema);

  // End of schema

  // Main
  // Handling user authentication
  app.post('/validateDB', async (req, res) => {
    let uid = req.body["uId"];
    let upw = req.body["uPw"];
    //let un = req.body["name"];
    //let enc = Bcrypt.hashSync(upw);
    //ac&pw: admin admin, user1 user1
    let validated = false;
    const result = await User.findOne({ userAc: uid});
    if (result !== null){
      validated = Bcrypt.compareSync(upw, result.password);
    }
    console.log(res.body);
    console.log(validated);
    if (validated){
      let output = {uName: result.name, isAdmin: result.isAdmin, ok: 1};
      res.send(JSON.stringify(output));
    }
    else{
      res.send(JSON.stringify({ok: 0}));
    }
  });

  // Parse data from xml
  app.all('/xml', (req, res) => {
    fetch(XML, {
      method: 'GET',
      headers: {
      'Content-Type': 'text/xml',
      'User-Agent': '*'
      },
    })
      .then(response => {return response.text();})
      .then(xml => {
        let jsonOutput = XMLconvert.xml2json(xml, {compact: true, spaces: 4});
        res.set("Content-Type", "application/json");
        res.send(jsonOutput);
      })
      .catch((error) => console.log(error));
  });

  app.all('/*', (req, res) => {
    // Create a new User
    /*
    User.create({
      userId: 3,
      userAc: "user2",
      name: "Jack",
      password: Bcrypt.hashSync("user2"),
      isAdmin: false
    });
    */
    res.send("Backend is running");
  });
})

const server = app.listen(PORT);
