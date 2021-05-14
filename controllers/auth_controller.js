const { signJWT } = require("../utils/jwt_helpers");
const createResponse = require("../utils/response");
const { StatusCodes, ResponseMessages } = require("../utils/status_codes")

const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.required_parameters));
    const user = await User.login(username, password);
    if (!user.isActivated) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.not_activated));
    signJWT(user._id, null, (err, token) => {
        if (err) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.sign_token_error));
    })


}


module.exports = { login }