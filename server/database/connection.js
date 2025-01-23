const mongoose = require('mongoose');

function RunServer(){
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    } catch (error){
        console.log("Not Connected");
    }
}

module.exports = RunServer;