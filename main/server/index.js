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
    date: { type: Date, Default: new Date() },
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
      let output = {uName: result.name, isAdmin: result.isAdmin, uAc: result.userAc, ok: 1};
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

  app.get('/getCm/:locId', (req, res) => { //load comment
    let req_locationId= req.params['locId'];
    console.log(req_locationId);
    Location.findOne({locationId:req_locationId}).exec(function(err, loc) {
      Comment.find({location:loc._id}).populate('author').exec(function(err, comment) {
        //console.log(comment);
        let list = "[\n";
        for (let i = 0; i < comment.length; i++) {
          let str =
            '{\n"name": "' +
            comment[i].author.name +
            '",' +
            '\n"content": "' +
            comment[i].content +
            '",' +
            '\n"date": "' +
            comment[i].date +
            '"\n}';
          if (i < comment.length - 1) str += "\n,";
          list += str + "\n";
        }
        list += "]";
        res.send(list);
        //res.send(comment);
    });
   

    })});

  app.put('/getCm/:locId', (req, res) => { //save comment

    let req_author =req.body['author']; //this is the username
    let req_location =req.body['location']; //this is the location id
    let req_content=req.body['content']; //this is the comment content
    
    let new_commentId;
        Comment.findOne().sort('-commentId').exec(function(err, cm) { //find the maximum commentId
          if (err) { res.status(404).set('Content-Type', 'text/plain').send("Error"); return;}
          else if (cm == null){ //there is no user currently
              new_commentId = 1; //first commentId is 1
          } 
          else {
            new_commentId = cm.commentId + 1;                            //new userID equals to the maximum commentId plus 1
          }
          User.findOne({userAc:req_author}).exec(function(err, user) { 
            Location.findOne({locationId:req_location}).exec(function(err,loc){
                Comment.create({
                  commentId:new_commentId,
                  location: loc._id,
                  author: user._id,
                  content: req_content,
                  date: new Date()
                })
      
              res.send("OK!");
            });
          });      
        });
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
    console.log(err, user);
    if (err) { res.status(404).set('Content-Type', 'text/plain').send("Error"); return;}
    else if (user == null){ //there is no user currently
        new_userId = 1; //first user id is 1
    } 
    else {
      new_userId = user.userId + 1;                            //new userID equals to the maximum userId plus 1
    }
    User.findOne({userAc:req.body['userAc']}).exec(function(err, user) {

      if (err || user!=null){ //make sure userAc is unique
  
        res.status(400).set('Content-Type', 'text/plain').send('Account Name '+req.body['userAc']+' already exists.');
        return;}
      
      let new_user = new User({
  
          userId: new_userId,
          userAc: req.body['userAc'], 
          password: Bcrypt.hashSync(req.body['password']),
          name: req.body['userName'],
          isAdmin: false, //user is not admin
          favorites: [""]
        
        });
         new_user.save(function (err){
          
            if (err) {res.status(404).set('Content-Type', 'text/plain').send('Error: cannot save');return;}      
        
            res.set('Content-Type', 'text/plain').status(201).send("User Created!"); //send the user the address
        });
      });
  });

   
  });
  /*
    //READ Event
  app.get('/read/1/:eventId', (req,res) =>{
    Event.findOne({eventId:req.params['eventId']}).populate('venue').exec(function(err,event){
      if(err || event == null || event == undefined)
        res.status(404).set('Content-Type', 'text/plain').send("Event ID " + req.params['EventId'] +" not found!");
      else{ 
        //console.log(event);
        let escapeStr = event.presenter.replaceAll('“', '\\“');
        let str =
                '{\n"title": "' +
                event.title.replaceAll('"', '\\"') +
                '",' +
                '\n"venue": "' +
                event.venue.name.replaceAll('"', '\\"') +
                '",' +
                '\n"date": "' +
                event.date +
                '",' +
                '\n"des": "' +
                event.description.replaceAll('"', '\\"') +
                '",' +
                '\n"pre": "' +
                escapeStr.replaceAll('”', '\\”') +
                '",' +
                '\n"price": "' +
                event.price +
                '"\n}';
        console.log(str);
        res.set('Content-Type', 'text/plain').send(str);
      }
    })
  });
  //READ Location
  app.get('/read/2/:locationId', (req,res)=>{
    Location.findOne({locationId:req.params['locationId']}).exec(function(err,loc){
      if(err || loc == null || loc == undefined)
        res.status(404).set('Content-Type', 'text/plain').send("Location ID " + req.params['locationId'] + " not found!");
      else res.set('Content-Type', 'text/plain').send(loc);
    })
  });
  //READ User
  app.get('/read/3/:userId', (req,res)=>{
    User.findOne({userId:req.params['userId']}).exec(function(err,user){
      if(err||user==null||user==undefined)
        res.status(404).set('Content-Type', 'text/plain').send("User not found!");
      else res.set('Content-Type', 'text/plain').send(user);
    })
  });
  */
  //Update Event
  app.post('/update/1', (req, res)=>{
      Location.findOne({locationId:req.body['locationId']}).exec(function(err, loc){
          if (err || loc == null) 
              res.status(404).set('Content-Type', 'text/plain').send('Location ID '+req.body['locationId'] +' does not exist.');
          else Event.findOne({eventId:req.body['eventId']}).exec(function(err, e){
              if(err || e == null)
                  res.status(404).set('Content-Type', 'text/plain').send('Event ID '+req.body['eventId'] +' does not exist.');
              else {
                  e.title = req.body['title'];
                  e.venue = loc._id;
                  e.date = req.body['date'];
                  e.description = req.body['description'];
                  e.presenter = req.body['presenter'];
                  e.price = req.body['price'];
                  e.save();
                  res.set('Content-Type', 'text/plain').send("Event Updated!");
              }
          })
      })
  });

  //Update Location 
  app.post('/update/2', (req,res)=>{
    Location.findOne({locationId:req.body['locationId']}).exec(function(err,loc){
      if(err || loc == null)
        res.status(404).set('Content-Type', 'text/plain').send('Location ID '+ req.body['locationId'] +' does not exist.');
      else{
        loc.locationId = req.body['locationId'];
        loc.name = req.body['name'];
        loc.coordinates = {lat: req.body['latitude'],lng: req.body['longitude']};
        loc.save();
        res.set('Content-Type', 'text/plain').send("Location Updated!");
      }
    })
  });

  //Update User
  app.post('/update/3', (req,res)=>{
    User.findOne({userAc:req.body['userId']}).exec(function(err,user){
      if(err || user == null)
        res.status(404).set('Content-Type', 'text/plain').send("User ID " + req.body['userId'] + " does not exist.");
        else{
          user.userAc = req.body['userAc'];
          user.password = req.body['password'];
          res.set('Content-Type', 'text/plain').send("User updated!");
        }
    })
  });
  
  app.post('/delete/1',(req,res)=>{  
    let req_eventId = req.body['eventId'];
    Event.findOne({eventId: req_eventId}).exec(function(err,e){
        if (err || e==null) {
            res.status(404).set('Content-Type', 'text/plain').send('Cannot find event with ID '+req_eventId);
            return;
          }        
        e.remove();
        res.status(200).set('Content-Type', 'text/plain').send("Event Deleted!");
       
    });


  });

  app.post('/delete/2',(req,res)=>{  
    let req_locationId = req.body['locationId'];
    Location.findOne({locationId: req_locationId}).exec(function(err,loc){
        if (err || loc==null) {
            res.status(404).set('Content-Type', 'text/plain').send('Cannot find location with ID '+req_locationId);
            return;
          }        
        loc.remove();
        res.status(200).set('Content-Type', 'text/plain').send("Location Deleted!");
       
    });


  });

  app.post('/delete/3',(req,res)=>{  
    let req_userAc = req.body['userAc'];
    User.findOne({userAc: req_userAc}).exec(function(err,user){
        if (err || user==null) {
            res.status(404).set('Content-Type', 'text/plain').send('Cannot find user with ID '+req_userAc);
            return;
          }        
        user.remove();
        res.status(200).set('Content-Type', 'text/plain').send("User Deleted!");
       
    });


  });

  //READ Venue
  app.get('/read/4/:eventId', (req,res) =>{
    Event.findOne({eventId:req.params['eventId']})
    .populate("venue")
    .exec(function(err,event){
      if(err || event == null || event == undefined)
        res.status(404).set('Content-Type', 'text/plain').send("Event ID " + req.params['EventId'] +" not found!");
      else res.set('Content-Type', 'text/plain').send(event.venue);
    })
  });

  app.put('/addFav/:locId', async(req,res)=>{
    let req_userAc =req.body['userAc']; //this is the username
    let req_locId =req.body['locationId']; //this is the location id
    const locResult = await Location.findOne({locationId:req_locId}).exec();
    
    const userResult = await User.findOne({userAc:req_userAc, favourites: locResult._id});
    // The user doesnot have this favourite location
    console.log(locResult._id);
    if (userResult == null || userResult == undefined){
      User.findOneAndUpdate({userAc: req_userAc}, {$push: {favourites: [locResult._id.toString()]}},
       (err, ok) => {
        console.log(err);
       });
      console.log("Added");
      res.send("Add");
    }
    else{
      await User.findOneAndUpdate({ userAc: req_userAc }, { $pull: { favourites:  locResult._id.toString()}});
      
      console.log("delete");
      res.send("Del");
    }
    //console.log(userResult);
  });

  app.get('/checkFav', (req, res) =>{

  });


app.get('/addFav/:locId', (req, res) => { //load comment
  let req_locationId= req.params['locId'];
  console.log(req_locationId);
  Location.findOne({locationId:req_locationId}).exec(function(err, loc) {
    Comment.find({location:loc._id}).populate('author').exec(function(err, comment) {
      //console.log(comment);
      let list = "[\n";
      for (let i = 0; i < comment.length; i++) {
        let str =
          '{\n"name": "' +
          comment[i].author.name +
          '",' +
          '\n"content": "' +
          comment[i].content +
          '",' +
          '\n"date": "' +
          comment[i].date +
          '"\n}';
        if (i < comment.length - 1) str += "\n,";
        list += str + "\n";
      }
      list += "]";
      res.send(list);
      //res.send(comment);
  });
 

  })});



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
