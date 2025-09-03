const { Router } = require("express");
const { userModel } = require("../database/db");
const userRoute = Router();

userRoute.get("/signup", async (req, res) => {
    const { username, password, name, role } = req.body;

    userModel.create({
        username,
        name,
        password,
        role,
    });
    res.status(200).json({
        message: "signUp Succeeded",
    });
});

module.exports = {
    userRoute,
};
