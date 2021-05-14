const createResponse = (type, message, data) => {
    return type === "bad" ? { error: message ?? "", data: data ?? {} } : { message: message ?? "", data: data ?? {} };
}
module.exports = createResponse;