const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true })); //strings and arrays
app.use(express.json());
app.use(express.static("public")); //presents your public folder to the front-end

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/reminder", (req, res) => {
    fs.readFile(path.join(__dirname,"/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/api/form", (req, res) => {
  const newReminder = req.body;
  console.log("newReminder", newReminder);

  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const allReminders = JSON.parse(data).filter((reminder) => reminder.text_id !== req.body.text_id);
    console.log("allReminders", allReminders);

    allReminders.push(newReminder);

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(allReminders), () => {
      res.json({
        success: true,
        data: newReminder,
      });
    });
  });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
