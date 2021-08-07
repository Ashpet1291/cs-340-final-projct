// Setup

const express = require('express');
const hbs = require('express-handlebars');
const path = require("path");

const app = express();
const port = 35560;


app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials',
}));

app.set('view engine', 'hbs');


// Database
const db = require('./database/db-connector');

app.use(express.static('img'));
app.use(express.static('public'));

// Main Pages
app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.get('/announcements', (req, res) => {
    res.render('announcementsMain', {layout: 'index'});
});

app.get('/familyMembers', (req, res) => {
    res.render('familyMembersMain', {layout: 'index'});
});

app.get('/items', (req, res) => {
    res.render('itemMain', {layout: 'index'});
});

app.get('/places', (req, res) => {
    res.render('placesMain', {layout: 'index'});
});

// Create Routes

// Read Routes

// Update Routes

// Delete Routes


// Error Pages
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(port, () => console.log(`App listening to port ${port}`));
