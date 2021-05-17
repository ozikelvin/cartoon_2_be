class StatusCodes {
    static OK = 200;
    static BAD = 404;
}
class ResponseMessages {
    static not_allowed = "Not allowed.";
    static required_parameters = "You have not passsed in the required parameters.";
    static not_activated = "You have not activated your account.";
    static sign_token_error = "There was an error signing you in.";
    static login_successful = "Your login attempt was successful.";
    static something_wrong = "Something went wrong while processing your request.";
    static user_already_exists = "This user already exists.";
    static password_length = "Password is too short";
    static unable_to_create_user = "Unsble to create an account.";
}


module.exports = { StatusCodes, ResponseMessages }