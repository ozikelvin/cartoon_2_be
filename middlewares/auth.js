const createResponse = require("../utils/response");
const { StatusCodes, ResponseMessages } = require("../utils/status_codes");

const checkAuth = (req, res, next) => {
    const authToken = req.header('AuthToken');
    if (authToken !== null && authToken === process.env.AUTH_TOKEN) return next();
    return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.not_allowed));
}

module.exports = { checkAuth };