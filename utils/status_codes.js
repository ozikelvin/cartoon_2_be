class StatusCodes {
    static OK = 200;
}
class ResponseMessages {
    static required_parameters = "You have not passsed in the required parameters.";
    static not_activated = "You have not activated your account.";
    static sign_token_error = "There was an error signing you in.";
}


module.exports = { StatusCodes, ResponseMessages }