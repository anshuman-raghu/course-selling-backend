const { Router } = require("express");
const { userModel, orderModel } = require("../database/db");
const userRoute = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyUserToken } = require("../middleware/verification");

userRoute.post("/signup", async (req, res) => {
    const { username, password, name } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await userModel.create({
        username,
        name,
        password: passwordHash,
    });
    res.status(200).json({
        message: "signUp Succeeded",
    });
});

userRoute.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.status(401).json({
            message: "Invalid username",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_USER_SECRET
    );

    res.status(200).json({
        message: "Login Succeeded",
        token,
    });
});

userRoute.get("/purchased-courses", verifyUserToken, async (req, res) => {
    const { id } = req.user;
    if (!id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const purchasedCourses = await orderModel
        .find({ userId: id })
        .populate("courseId");
    res.status(200).json({
        purchasedCourses,
    });
});
module.exports = {
    userRoute,
};
