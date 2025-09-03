const express = require("express");
const courseRoute = express.Router;

courseRoute.get("/", async (req, res) => {
    res.status(200).json({
        message: "this is course route",
    });
});

module.exports = {
    courseRoute,
};
