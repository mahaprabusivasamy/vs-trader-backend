const { MongoClient } = require('mongodb');

let db;

// Callback used to start server
function connectToDb(startServer) {
    MongoClient.connect('mongodb+srv://mahaprabus:mongodb12@project.iqwdypx.mongodb.net/Vs-Traders')
        .then(function (client) {
            db = client.db();
            return startServer();
        })
        .catch(function (error) {
            return startServer(error);
        });
}

function getDb() {
    return db;
}

module.exports = { connectToDb, getDb };
