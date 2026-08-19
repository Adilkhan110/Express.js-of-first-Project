const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/adil123").then(() => {
    console.log("Database Connection Successfully")
});