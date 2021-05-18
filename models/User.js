const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "You have to provide an email address."],
        unique: true,
        trim: true,
    },
    username: {
        trim: true,
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        lowercase: true,
        minlength: [5, "The username must be at least 5 characters long"],
        maxlength: [15, "The maximum length is fifteen characters"]
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password."],
    },
    avatar: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: new Date().toISOString,
    },
    otp: {
        type: String,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    communityCode: Number,
    fcm_token: String,

});







userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username }).lean();
    if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect username");
};
userSchema.statics.register = async function (email, username) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        const user = await this.findOne({ email }).lean();
        if (user) {
            throw Error("email already exists");
        } else {
            const userName = await this.findOne({ username }).lean();
            if (userName) {
                throw Error("email already exists");
            } else {
                return null;
            }
        }
    } else {
        throw Error("invalid emailaddress");
    }


};

module.exports = mongoose.model('user', userSchema);