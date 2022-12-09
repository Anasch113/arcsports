const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const port = 8000;
//Mongoose Stuff
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/arcsport');
  
  
}
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    sport: String,
    desc: String
  });
  const Contactnew = mongoose.model('Contactnew', contactSchema);



//Express Stuff
 app.use('/static', express.static('static')) // For serving static files
 app.use(express.urlencoded())

app.set('view engine','hbs') // Set the template engine as hbs
// app.set('views', path.join(__dirname, '/views')) // Set the views directory

app.get('/', (req, res)=>{
     res.render('index.hbs');
});
app.get('/arcfun', (req, res)=>{
    res.render('arcfun.hbs');
});
app.get('/contact', (req, res)=>{
    res.render('contact.hbs');
});
app.post('/contact', (req, res)=>{
    var myData = new Contactnew(req.body);
    myData.save().then(()=>{
        res.send("Your registration form has been submitted successfully")
    }).catch(()=>{
        res.status(400).send("Ops! form not submitted successfully,Please try again")
    });
   
});
app.get('/tournaments', (req, res)=>{
    res.render('tournaments.hbs');
});



//Starting the server
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`)
});