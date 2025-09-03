const express = require("express");
const adminRoute = express.Router;

adminRoute.get("/", async (req, res) => {
    res.status(200).json({
        message: "this is Admin route",
    });
});

module.exports = {
    adminRoute,
};
