const express = require("express");
const courseRoute = express.Router();
const { courseModel, orderModel } = require("../database/db");
const { verifyUserToken } = require("../middleware/verification");

courseRoute.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});
    res.status(200).json({
        courses,
    });
});

courseRoute.post("/purchase", verifyUserToken, async (req, res) => {
    const { id } = req.user;
    const { courseId } = req.body;
    if (!id) {
        return res.status(401).json({
            message: "Unauthorized ",
        });
    }
    const course = await courseModel.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found",
        });
    }
    await orderModel.create({
        userId: id,
        courseId,
    });
    res.status(200).json({
        message: "Course purchased successfully",
    });
});

module.exports = {
    courseRoute,
};
