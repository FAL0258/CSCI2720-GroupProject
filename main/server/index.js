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
    date: { type: String, required: true },
    description: { type: String },
    presenter: { type: String, required: true },
    price: { type: String, required: true }
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
      .then(async (xml) => {
        let jsonOutput = XMLconvert.xml2json(xml, {compact: true, spaces: 4});
        let better = jsonOutput;
        jsonOutput = JSON.parse(jsonOutput);
        let jEvent = jsonOutput.events.event;
        let totalC = jEvent.length;
        //console.log(jEvent[1].titlee._cdata);

        // create every events in database
        for( let i = 0; i < totalC; i++ ){
          const query = await Location.findOne({locationId: jEvent[i].venueid._cdata});
          const query2 = await Event.findOne({eventId: jEvent[i]._attributes.id});
          // Create the event if not exist
          if (query != null && query2 == null){
            // Find the event count in one location
            const query3 = await Event.find({venue: query._id});
            // Prevent making too many records, limited to maximum 7 events per location
            if(query3.length < 7){
              // Prevent free event from being created with null value
              let tempPrice = jEvent[i].pricee._cdata;
              if (tempPrice == null || tempPrice == undefined){
                tempPrice = "Free";
              }
              // Prevent empty description
              let tempDes = jEvent[i].desce._cdata;
              if (tempDes == null || tempDes == undefined){
                tempDes = "";
              }
              Event.create({
                eventId: jEvent[i]._attributes.id,
                title: jEvent[i].titlee._cdata,
                venue: query._id,
                date: jEvent[i].predateE._cdata,
                description: tempDes,
                presenter: jEvent[i].presenterorge._cdata,
                price: tempPrice
              });
            }
          }
        }
        console.log("Finished");
        //res.set("Content-Type", "application/json");
        res.send("DONE");
        //res.send(better);
        //res.send(jEvent[1]);
      })
      .catch((error) => console.log(error));
  });

  app.all('/grabEv', (req, res) => {
    Event.find({}, (err, event) => {
      res.send(event);
    });
  });

  app.all('/grabLoc', (req, res) => {
    Location.find({}, (err, location) => {
      res.send(location);
    });
  });

  app.all('/getCm/:locId', (req, res) => {

  });

  app.post('/create/1',(req,res)=>{
  
    Event.findOne({eventId:req.body['eventId']}).exec(function(err, e) { //make sure eventId is unique
      
      if (err || e!=null){ 
      
      res.status(400).set('Content-Type', 'text/plain').send('Event ID '+req.body['eventId']+' already exists.');
      return;}
    Location.findOne({locationId:req.body['locationId']}).exec(function(err,loc){
      if (err || loc==null) {
        res.status(404).set('Content-Type', 'text/plain').send('Location with this ID '+req.body['locationId']+' is not found.');
        return;
      }
      else {
        let new_event = new Event({

          eventId: req.body['eventId'], //still need to check if it is unique?
            title: req.body['title'],
            venue: loc._id,
            date: req.body['date'],
            description: req.body['description'],
            presenter: req.body['presenter'],
            price: req.body['price'],
           
        });
         new_event.save(function (err){
            if (err) {res.status(404).set('Content-Type', 'text/plain').send('Error: cannot save');return;}      
       
        
            res.set('Content-Type', 'text/plain').status(201).send("Event Created!"); //send the user the address
        });
  }
})
});});

app.post('/create/2',(req,res)=>{
  
  Location.findOne({locationId:req.body['locationId']}).exec(function(err, loc) {
    
    if (err || loc!=null){ //make sure locationId is unique
      
    
    res.status(400).set('Content-Type', 'text/plain').send('Location ID '+req.body['locationId']+' already exists.');
    return;}
  
      let new_location = new Location({

        locationId: req.body['locationId'],
        name: req.body['name'],
        coordinates: {lat: req.body['latitude'],lng: req.body['longitude']}
             
      });
       new_location.save(function (err){
          if (err) {res.status(404).set('Content-Type', 'text/plain').send('Error: cannot save');return;}      
      
          res.set('Content-Type', 'text/plain').status(201).send("Location Created!"); //send the user the address
      });});
  
});

app.post('/create/3',(req,res)=>{  
  let new_userId;
  User.findOne().sort('-userId').exec(function(err, user) { //find the maximum userId
    if (err) { res.status(404).set('Content-Type', 'text/plain').send("Error"); return;}
    else if (user == null){ //there is no user currently
        new_userId = 1; //first user id is 1
    } 
    else {
      new_userId = user.userId + 1;                            //new userID equals to the maximum userId plus 1
    }
  });
  User.findOne({userAc:req.body['userAc']}).exec(function(err, user) {

    if (err || user!=null){ //make sure userAc is unique
      res.status(400).set('Content-Type', 'text/plain').send('Account Name '+req.body['userAc']+' already exists.');
      return;}
    
    let new_user = new User({

        userId: new_userId,
        userAc: req.body['userAc'], 
        password: req.body['password'],
        name:req.body['userAc'], //just assume the initialize name equals to the userAc 
        isAdmin: false //user is not admin
      
      });
       new_user.save(function (err){
        
          if (err) {res.status(404).set('Content-Type', 'text/plain').send('Error: cannot save');return;}      
      
          res.set('Content-Type', 'text/plain').status(201).send("User Created!"); //send the user the address
      });
    });

   
  });


  app.all('/*', (req, res) => {
    /*
    Location.create({
      locationId: 50110016,
      name: "Hong Kong Cultural Centre (Studio Theatre)",
      coordinates: {lat: 22.29386, lng: 114.17053}
    });
    */
    res.send("Backend is running");
  });
})

const server = app.listen(PORT);
