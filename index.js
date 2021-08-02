const express = require('express');
const hbs = require('express-handlebars');
const path = require("path");

const app = express();
const port = 12560;


app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/',
}));

app.set('view engine', 'hbs');


app.use(express.static('img'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.get('/thinkers', (req, res) => {
    res.render('thinkers', {layout: 'index'});
});

app.get('/philosophy', (req, res) => {
    res.render('philosophy', {layout: 'index'});
});

app.get('/orgs', (req, res) => {
    res.render('orgs', {layout: 'index'});
});

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
