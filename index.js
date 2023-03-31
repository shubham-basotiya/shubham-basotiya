var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://127.0.0.1:27017';//"mongodb+srv://shubhambasotiya:shubham%40123S@cluster0.iuz93vw.mongodb.net/?retryWrites=true&w=majority";//"mongodb://127.0.0.1:27017";
var bodyParser = require('body-parser');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false });  
// var cookieParser = require('cookie-parser');
const { response } = require("express");
// const { addAbortSignal } = require("stream");
// const { rmSync } = require("fs");
// var { response } = require("express");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// app.get('/process_get',function(req, res){
//     response = {
//         first_name:req.query.first_name,
//         last_name:req.query.last_name
//     };
//     console.log(response);
//     let data = [];
//     MongoClient.connect(url, function(err, db){
//         if (err) throw err;
//         var dbo = db.db("mydb");
//         dbo.collection("hits").insertOne(response);
//         // dbo.collection("hits").find({}, function(err, result) {
//         //     if (err) throw err;
//         //     res.json(result);
//         //     db.close();
//         // });
//     })
    
//     // res.end(dbo.collection("hits").find({}));
//     res.end(JSON.stringify(response));
// });

app.get('/index.js', urlencodedParser, (req, res) => {
    console.log("chck block");
    normalData = {
        check:req.query.check,
    };
    console.log(normalData.check);
    if(normalData.check !== undefined){
    $createdDate = new Date();//$cratedYear + '-' + $cratedMonth + '-' + $cratedDay;
    // $modified = new Date(new Date().setDate(new Date().getDate() - 1));
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("task_tracker");
        dbo.collection("taskData").findOne({taskcreation: {$gte: $createdDate}}, function(err, result){
            if (err) throw err;
                res.json(result);
    //             // db.close();     
        });
    });
    } 
    
    // next();
});


app.post('/index.js', urlencodedParser,function(req, res){
    console.log("submit data block 2");
    if(req.body.taskname !== null || req.body.taskname !== undefined || req.body.taskdescription !== null || req.body.taskdescription !== undefined)
    {
    $createdDate = new Date();
    console.log($createdDate);
    $createdDate = new Date($createdDate.setHours(0, 0, 0, 0));
    // $createdDate = new Date($createdDate.setMinutes(0));
    // $createdDate = new Date($createdDate.setSeconds(0));

    responsed = {
        // first_name:req.body.first_name,
        // last_name:req.body.last_name
        taskname:req.body.taskname,
        taskdescription:req.body.taskdescription,
        taskcreation: $createdDate ,
        taskduration:req.body.taskduration
    };
    console.log(responsed);
    // let data = [];
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("task_tracker");
        dbo.collection("taskData").insertOne(responsed,function(err, result){
            if (err) throw err;
                res.json(responsed.taskduration);
                console.log({_id: result.insertedId, timeduration: responsed.taskduration});
    //             // db.close();     
        });
        // dbo.collection("hits").find({}, function(err, result) {
        //     if (err) throw err;
        //     res.json(result);
        //     db.close();
        // });
    })

    } else{
        // res.json("data not inserted into database");
        cosole.log("data not inserted into database");
    }
    
    // res.end(dbo.collection("hits").find({}));
    // res.end(JSON.stringify(response));
    // res.redirect("http://localhost:3000/index.html");
});

app.put('/index.js', urlencodedParser, function(req, res){
    console.log("update block");
    if(req.body.incre !== null || req.body.incre !== undefined){
        updateData = {
            taskduration: req.body.updateDuration
        }
        console.log(updateData);
        MongoClient.connect(url, function(err, db){
            if (err) throw err;
            var dbo = db.db("task_tracker");
            dbo.collection("taskData").update({}, {$set:updateData},function(err, result){
                if (err) throw err;
                    res.json(updateData.taskduration);
                    // console.log({_id: result.insertedId, timeduration: responsed.taskduration});
        //             // db.close();     
            });
        });
    }
});

app.delete('/index.js', urlencodedParser, function(req, res){
    console.log("update block");
    if(req.body.remove !== null || req.body.remove !== undefined){

        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("task_tracker");
            dbo.collection("taskData").deleteMany({}, function(err, result){
                if(err) throw err;
                res.json(result["deletedCount"]);
            });
        });
    }
});

// app.get('/index.html', (req, res) => {
//     res.sendFile(__dirname+"/"+"index.html");
// });
/*
app.post('index.html',urlencodedParser, (req, res) => {
    response = {
        check:req.body.check
    };
    console.log(response);
    res.end(response);

    $cratedYear = new Date().getFullYear();//date('d');
    $cratedMonth = new Date().getMonth();//date('d');
    $cratedDay = new Date().getDate();//date('d');

    $createdDate = $cratedYear + '-' + $cratedMonth + '-' + $cratedDay;
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("task_tracker");
        dbo.collection("taskData").findOne({taskcreation: $createdDate}, function(err, result){
            if (err) throw err;
                res.json(result);
                // db.close();     
        });
        res.json
        // dbo.collection("hits").find({}, function(err, result) {
        //     if (err) throw err;
        //     res.json(result);
        //     db.close();
        // });
        });
    });
    */




var server = app.listen(3000,function(){
    // console.log(server);
    // console.log(req.app);
    
});
