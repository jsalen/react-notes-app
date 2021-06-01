const { Router } = require("express");
const router = Router();
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).delete(deleteNote).put(updateNote);

module.exports = router;
