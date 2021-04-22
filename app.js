const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express()
const port = 8000;

//Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });   

const Contact = mongoose.model('Contact', contactSchema);

// Express
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Pug 
app.set('view engine', 'pug') //Setting template engine for pug
app.set('views', path.join(__dirname, 'view'))

app.get('/', (req, res)=>{
    const content = {}
    res.status(200).render('home.pug', content)
})

app.get('/contact', (req, res)=>{
    const content = {}
    res.status(200).render('contact.pug', content)
})
app.post('/contact', (req, res)=>{
    let myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send(`<div class="alert alert-primary" role="alert">
        Items Are Saved Into Database..
      </div>`) 
    }).catch(()=>{
        res.status(400).send("There is some problem with database..")
    });
    // res.status(200).render('contact.pug')
})

app.listen(port, ()=>{
    console.log(`The Server is running on port number ${port}`);
    
})