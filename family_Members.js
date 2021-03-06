module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getfamilyMembers(res, mysql, context, complete){
        var sql = ("SELECT family_id, first_name, nick_name, last_name, birthday, primary_number from Family_Members"
        mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.familyMembers = results;
        complete();
    });
}


    function getfamilyMember(res, mysql, context, id, complete){
        var sql = "SELECT family_id, first_name, nick_name, last_name, birthday, primary_number FROM Family_Members WHERE family_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.familyMember = results[0];
            complete();
        });
    }
    /*Display all people. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFamilyMember.js"];
        var mysql = req.app.get('mysql');
        getfamilyMembers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('familyMembers', context);
            }
        }
    });
	
    /* Display one person for the specific purpose of updating people */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-person', context);
            }
        }
    });
	
    /* Adds a person, redirects to the people page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    });
	
    /* The URI that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Family_Members WHERE family_id= ?";
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

    return router;
}();
