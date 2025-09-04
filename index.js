const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { userRoute } = require("./routes/user.route");
const { adminRoute } = require("./routes/admin.route");
const { courseRoute } = require("./routes/course.route");
dotenv.config({
    path: "./.env",
});

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/course", courseRoute);

const port = process.env.PORT || 3000;

function main() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB", err);
            process.exit(1);
        });
}

main();
