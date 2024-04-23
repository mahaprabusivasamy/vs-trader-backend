const express=require('express')
const bodyParser=require('body-parser')
const {connectToDb,getDb}=require('./db.cjs')
const { MongoClient,ObjectId } = require('mongodb')


const app=express()
app.use(bodyParser.json())
app.use(express.static(__dirname))
let db

// retriv callback from db.cjs
connectToDb(function(error){
    if(!error){
        app.listen(8001)
        console.log("server listen on port 8001")
        db=getDb()
    }
    else{
       console.log(error)
    }
})



app.post('/add-price',function(req,res){
    // console.log(req.body)
    db.collection('Live_update')
    .insertOne(req.body).then(function(){
        res.status(201).json({
            "datasent":'suceesfully'
        })
    }).catch(function(error){
        console.log(error)
    })
    // res.status(200).json({
    //     "sent":'sucessfully'
    // })
})
// get data
app.get('/get-price',function(req,res){

    const empty=[]
    db.collection('Live_update').find()
    .forEach(entr=>empty.push(entr))
    .then(function()
    {
        res.status(200).json(empty)
    }).catch(function(error){
        res.status(404).json({
            'error':error
        })
    })
})

app.delete('/delete-price', function(req, res) {
    const id = req.body._id; // Get the _id from the request body
    if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
        // Check if id is a string and matches the ObjectId format
        // @ts-ignore
        const objectId = new ObjectId(id); // Create ObjectId from the string _id
        db.collection('Live_update').deleteOne({
            _id: objectId
        }).then(function(result) {
            if (result.deletedCount === 1) {
                res.status(200).json({
                    "status": 'data delete successfully'
                });
            } else {
                res.status(404).json({
                    "error": 'Document not found'
                });
            }
        }).catch(function(error) {
            res.status(500).json({
                "error": error.message
            });
        });
    } else {
        res.status(400).json({
            "error": "Invalid _id format"
        });
    }
});
// update

app.patch('/update-price', function(req, res) {
    const id = Number(req.body.id); // Convert req.body.id to a number
    if (!isNaN(id)) { // Check if the converted id is a valid number
        const objectId = ObjectId.createFromTime(id); // Create ObjectId from a numeric value
        db.collection('Live_update').updateOne({
            _id: objectId
        }, {
            $set: req.body.data
        }).then(function() {
            res.status(201).json({
                "status": 'data update successfully'
            });
        }).catch(function(error) {
            res.status(500).json({
                "error": error
            });
        });
    } else {
        res.status(400).json({
            "error": "Invalid ObjectId"
        });
    }
});

app.post('/post-available',function(req,res){
    // console.log(req.body)
    db.collection('Available')
    .insertOne(req.body).then(function(){
        res.status(201).json({
            "datasent":'suceesfully'
        })
    }).catch(function(error){
        console.log(error)
    })
    // res.status(200).json({
    //     "sent":'sucessfully'
    // })
})

app.get('/get-available',function(req,res){

    const empty=[]
    db.collection('Available').find()
    .forEach(entr=>empty.push(entr))
    .then(function()
    {
        res.status(200).json(empty)
    }).catch(function(error){
        res.status(404).json({
            'error':error
        })
    })
})

app.patch('/update-available', function(req, res) {
    const id = Number(req.body.id); // Convert req.body.id to a number
    if (!isNaN(id)) { // Check if the converted id is a valid number
        const objectId = ObjectId.createFromTime(id); // Create ObjectId from a numeric value
        db.collection('Live_update').updateOne({
            _id: objectId
        }, {
            $set: req.body.data
        }).then(function() {
            res.status(201).json({
                "status": 'data update successfully'
            });
        }).catch(function(error) {
            res.status(500).json({
                "error": error
            });
        });
    } else {
        res.status(400).json({
            "error": "Invalid ObjectId"
        });
    }
});
app.delete('/delete-available', function(req, res) {
    const id = req.body._id; // Get the _id from the request body
    if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
        // Check if id is a string and matches the ObjectId format
        // @ts-ignore
        const objectId = new ObjectId(id); // Create ObjectId from the string _id
        db.collection('Live_update').deleteOne({
            _id: objectId
        }).then(function(result) {
            if (result.deletedCount === 1) {
                res.status(200).json({
                    "status": 'data delete successfully'
                });
            } else {
                res.status(404).json({
                    "error": 'Document not found'
                });
            }
        }).catch(function(error) {
            res.status(500).json({
                "error": error.message
            });
        });
    } else {
        res.status(400).json({
            "error": "Invalid _id format"
        });
    }
});
/**      {
    "id":"1",
    "date":"22-04-2024",
    "goat":{
      "goat-price":799,
      "sheep-price":500
    },
    "chicken":{
        "broiler-price":299,
        "countrychicken-price":600
    },
    "fish":{
        "crab-price":699,
        "prawn-price":400
    }
}        */