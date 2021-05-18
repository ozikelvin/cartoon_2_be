// Import mongoose
const mongoose = require("mongoose");
const  { Logger } = require("../utils/chalk.js");

module.exports =  async function connectDB() {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        Logger(`MongoDB Connected: ${conn.connection.host}`, 'green');
    } catch (err) {
        // console.error(err);
        Logger("Unable To Connect To MongoDB", 'red');
        process.exit(1);
    };

    return true;
};