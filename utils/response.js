const createResponse = (type, message, data, token) => {
    return type === "bad" ? { status: type, error: message ?? "", data: {} } : { status: type, message: message ?? "", data: data ?? {}, token: token ?? "" };
}
module.exports = createResponse;
//