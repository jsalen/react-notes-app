const notesController = {};
const NoteModel = require("../models/Note.js");

notesController.getNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.json(notes);
};

notesController.getNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  console.log(note.title);
  res.json(note);
};

notesController.createNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newNote = new NoteModel({
    title,
    content,
    date,
    author,
  });
  await newNote.save();
  res.json({ message: "Note saved" });
};

notesController.updateNote = async (req, res) => {
  const { title, content, author } = req.body;
  await NoteModel.findOneAndUpdate(req.params.id, {
    title,
    content,
    author,
  });
  res.json({ message: "Note updated" });
};

notesController.deleteNote = async (req, res) => {
  await NoteModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Note Deleted" });
};

module.exports = notesController;
