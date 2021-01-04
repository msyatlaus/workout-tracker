const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://bradleyguidry:Min3wc0de!@cluster0.s5ebv.mongodb.net/workout-tracker?retryWrites=true&w=majority";
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(uri || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.connection.on("connected",() => {
  console.log('Mongoose is connected');
});
// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});