const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const adminSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const courseSchema = new Schema(
    {
        courseName: { type: String, required: true },
        description: String,
        image: String,
        price: { type: Number, required: true },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "admins",
            required: true,
        },
    },
    { timestamps: true }
);

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "courses",
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const userModel = model("users", userSchema);
const adminModel = model("admins", adminSchema);
const courseModel = model("courses", courseSchema);
const orderModel = model("orders", orderSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    orderModel,
};
