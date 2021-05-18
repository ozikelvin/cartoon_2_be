const { Router } = require("express");
const createResponse = require("../utils/response");
const { StatusCodes } = require("../utils/status_codes");

const path = "/ping";
const router = Router();

router.get('/', (req, res, _) => {
    res.status(StatusCodes.OK).json(createResponse("good", "Pong"))
});

module.exports = { router, path };