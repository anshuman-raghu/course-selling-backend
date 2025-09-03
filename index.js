const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const { userRoute } = require("./routes/user.route");

dotenv.config({
    path: "./.env",
});

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoute);

const Port = process.env.PORT || 3000;

function main() {
    mongoose.connect(process.env.MONGODB_URL);
    app.listen(Port);
}

main();
