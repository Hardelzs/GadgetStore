import express from "express";
import fs from "fs";
import cors from "cors";
const app = express();
const PORT = 5000;

const DATA_FILE = "./devices.json";

app.use(cors());
app.use(express.json());

// Get all devices
app.get("/devices", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading data" });
    res.json(JSON.parse(data || "[]"));
  });
});

// Save all devices (overwrite)
app.put("/devices", (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Error writing data" });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// POST /api/devices - Add one new device
app.post("/api/devices", (req, res) => {
  const newDevice = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading data" });

    let devices = [];
    try {
      devices = JSON.parse(data || "[]");
    } catch (parseError) {
      return res.status(500).json({ error: "Error parsing data" });
    }

    devices.push(newDevice); // Add the new device
    fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 2), (writeErr) => {
      if (writeErr)
        return res.status(500).json({ error: "Error writing new device" });
      res.status(201).json({ success: true, device: newDevice });
    });
  });
});



