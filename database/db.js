const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

const userModel = model("users", userSchema);

module.exports = {
    userModel,
};
