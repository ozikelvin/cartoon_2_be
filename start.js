const express = require( "express");
const { Logger } = require("./utils/chalk.js");
const  routes = require("./routes/index.js")
const chalk = require("chalk");
const createResponse = require("./utils/response.js");
const { ResponseMessages } = require("./utils/status_codes.js");

const app = express();
const PORT = process.env.PORT || 3000;

 const startApp = () => {
    const greeting = process.env.NODE_ENV === "development" ? "Application listening on PORT " + PORT + "\nApplication can be found at " + chalk.yellow.bold('http://localhost:' + PORT) : "Application listening on PORT " + PORT;
    app.listen(PORT, () => {
        Logger(greeting, 'green');
    });
}
 const setUpRoutes = () => {
     app.use(express.json())
    app.use(routes.path, routes.router)
    app.use("/", (_, res, __) => {
        res.status(200).json(createResponse("bad", ResponseMessages.not_allowed))
    })
}

module.exports ={startApp, setUpRoutes}