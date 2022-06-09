// IMPORTING THE REQUIRED MODULES
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// IMPORTING THE CUSTOM MODULES
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1: Get all Notes using: GET "/api/notes/fetchallnotes"      AUTHENTICATION REQUIRED
router.get('/fetchallnotes', fetchuser, async (req, res) => {
     try {
          const notes = await Note.find({ user: req.user.id });
          res.json(notes);

     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});

// ROUTE 2: Add a new Note using: GET "/api/notes/addnote"      AUTHENTICATION REQUIRED
router.post('/addnote', fetchuser, [
     body('title', "Enter a title of atleast 3 characters").isLength({ min: 3 }),
     body('description', "description must be of atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

     try {
          const { title, description, tag } = req.body;

          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const note = new Note({
               title, description, tag, user: req.user.id
          });
          const savedNote = await note.save();

          res.json(savedNote);


     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});



// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id"      AUTHENTICATION REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
     try {
          const { title, description, tag } = req.body;

          // Create a new note object
          const newNote = {};
          if (title) { newNote.title = title };
          if (description) { newNote.description = description };
          if (tag) { newNote.tag = tag };

          // Find the note to be updated
          let note = await Note.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found!"); };

          // Allow updation only if user owns this note
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed");
          };

          // Update the note
          note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

          res.json({ note });
     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }

});


// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/:id"      AUTHENTICATION REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     try {
          // Find the note to be deleted
          let note = await Note.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found!"); };

          // Allow deletion only if user owns this note
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed");
          };

          // Delete the note
          note = await Note.findByIdAndDelete(req.params.id);

          res.json({ "Success": "Note has been deleted", note: note });
     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});
module.exports = router;