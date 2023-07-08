const mongoose = require("mongoose");
const db = () => {
    const connectionParams = {useNewUrlParser:true};
    mongoose.connect("mongodb+srv://shivamsharma:shivam@cluster0.jqk5rs6.mongodb.net/searchFunc?retryWrites=true&w=majority", connectionParams);

    mongoose.connection.on("connected", () => {
        console.log("Database Connected...");
    });

    mongoose.connection.off("error", (err   ) => {
        console.log("Error while connecting to the database:" +err);
    });
    
    mongoose.connection.on("disconnected", () => {
        console.log("Database Disconnected...");
    });
}
module.exports = db;