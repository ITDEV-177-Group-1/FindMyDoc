const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

// Simple API to get all doctors
app.get("/doctors", (req, res) => {
    db.all("SELECT * FROM Doctors", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
