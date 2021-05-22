const { signJWT } = require("../utils/jwt_helpers");
const createResponse = require("../utils/response.js");
const { StatusCodes, ResponseMessages } = require("../utils/status_codes.js");
const robohashAvatars = require("robohash-avatars");
const { genOTP } = require("../utils/genOTP.js");
const { createUser } = require("../utils/user_utils.js");
const mailer = require('../utils/mailEngine');
 const User = require('../models/User');
const login = async (req, res, next) => {

    const { username, password } = req.body;
    if (!username || !password) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.required_parameters));
    const user = await User.login(username, password);
    if (!user.isActivated) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.not_activated));
    try {
        signJWT(user._id, null, (err, token) => {
            if (err) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessagrees.sign_token_error));
            return res.status(StatusCodes.OK).json(createResponse("good", ResponseMessages.login_successful, null, token))
        });
    } catch {
        res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.something_wrong))
    }
}
const register = async (req, res, next) => {

    const OTP = genOTP(6);
    const { username, password, email } = req.body;
    const newMail = {
        from: process.env.USER_NAME,
        to: email,
        subject:'Verify your account',
        html: `Hello ${username}, this is your OTP: ${OTP} `
    }
    var avatarURL = robohashAvatars.generateAvatar({
        username: username,
        characters: robohashAvatars.CharacterSets.Robots,
        height: 400,
        width: 400
    });
    if (!username || !password || !email) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.required_parameters));
    const user = await User.register(email, username);
    if (user) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.user_already_exists));
    if (password.length < 7) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.password_length));
    const { created, newUser } = await createUser(username, email, password, OTP, avatarURL);
    if (!created) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.unable_to_create_user));
    signJWT(newUser._id, null, (err, token) => {
        if (err) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.sign_token_error));
        console.log('User Created') 
        //TODO: Send token to user email.
        const {err : mailerErr} = mailer(newMail)
        if(mailerErr) return res.status(StatusCodes.OK).json(createResponse("bad", ResponseMessages.unable_to_send_mail));

    });
}



module.exports = { login, register }
