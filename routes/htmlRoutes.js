var router = require("express").Router();
var path = require("path");

// Render index.html at the "/" path
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Render notes.html at the "/notes" path
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// All other paths serve the index.html page
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
