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

app.use(express.static(__dirname +'/public'));

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
    res.render('itemsMain', {layout: 'index'});
});

app.get('/places', (req, res) => {
    res.render('placesMain', {layout: 'index'});
});

// Create Routes

// Read Routes

// Update Routes

// Delete Routes
    app.delete('Family_Members/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Family_Members WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return app;
}();

    app.delete('/places/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Places WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return app;
}();

    app.delete('/announcements/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Announcements WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return app;
}();

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
