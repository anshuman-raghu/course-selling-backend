const express = require("express");
const adminRoute = express.Router();
const { adminModel, courseModel } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAdminToken } = require("../middleware/verification");

adminRoute.post("/signup", async (req, res) => {
    const { username, password, name } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await adminModel.create({
        username,
        name,
        password: passwordHash,
    });
    res.status(200).json({
        message: "Admin signUp Succeeded",
    });
});

adminRoute.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await adminModel.findOne({ username });
    if (!admin) {
        return res.status(401).json({
            message: "Invalid username",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }
    const token = jwt.sign(
        {
            id: admin._id,
        },
        process.env.JWT_ADMIN_SECRET
    );
    res.status(200).json({
        message: "Admin Login Succeeded",
        token,
    });
});

adminRoute.post("/create-course", verifyAdminToken, async (req, res) => {
    const { id } = req.admin;
    const { courseName, description, image, price } = req.body;
    if (!id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const course = await courseModel.create({
        courseName,
        description,
        image,
        price,
        owner: id,
    });
    res.status(200).json({
        message: "Course created successfully",
        course,
    });
});

adminRoute.put(
    "/update-course/:courseId",
    verifyAdminToken,
    async (req, res) => {
        const { id } = req.admin;
        const { courseId } = req.params;
        const { courseName, description, image, price } = req.body;
        if (!id) {
            return res.status(401).json({
                message: "Unauthorized you are not admin",
            });
        }
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        if (course.owner.toString() !== id) {
            return res.status(403).json({
                message: "Forbidden You are not the owner of this course",
            });
        }
        await courseModel.findByIdAndUpdate(courseId, {
            courseName,
            description,
            image,
            price,
        });
        res.status(200).json({
            message: "Course updated successfully",
        });
    }
);

adminRoute.delete(
    "/delete-course/:courseId",
    verifyAdminToken,
    async (req, res) => {
        const { id } = req.admin;
        const { courseId } = req.params;
        if (!id) {
            return res.status(401).json({
                message: "Unauthorized you are not admin",
            });
        }
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        if (course.owner.toString() !== id) {
            return res.status(403).json({
                message: "Forbidden You are not the owner of this course",
            });
        }
        await courseModel.findByIdAndDelete(courseId);
        res.status(200).json({
            message: "Course deleted successfully",
        });
    }
);

adminRoute.get("/courses", verifyAdminToken, async (req, res) => {
    const { id } = req.admin;
    if (!id) {
        return res.status(401).json({
            message: "Unauthorized you are not admin",
        });
    }
    const courses = await courseModel.find({ owner: id });
    res.status(200).json({
        courses,
        message: "Courses fetched successfully",
    });
});

module.exports = {
    adminRoute,
};
