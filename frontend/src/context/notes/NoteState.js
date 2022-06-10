import React, { useState } from 'react';
import NoteContext from "./NoteContext";

const NoteState = (props) => {

     const host = 'http://localhost:8000';

     const notesInitial = [];
     const [notes, setNotes] = useState(notesInitial);

     // Get all notes
     const getNotes = async () => {
          // API CALL
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMThhN2QyNTY3MDdhNTc2YjAyMzY4In0sImlhdCI6MTY1NDc1MzkxN30.zLLVBA63Tilo2-j__ScSwlZuxrQnVMuTOgNsevSNQzc'
               }
          });
          const json = await response.json();

          setNotes(json)

     }

     // Add a note
     const addNote = async (title, description, tag) => {
          // API CALL
          const response = await fetch(`${host}/api/notes/addnote`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMThhN2QyNTY3MDdhNTc2YjAyMzY4In0sImlhdCI6MTY1NDc1MzkxN30.zLLVBA63Tilo2-j__ScSwlZuxrQnVMuTOgNsevSNQzc'
               },
               body: JSON.stringify({ title, description, tag })
          });

          console.log("Successfully added the note");

          // Adding the note
          const note = {
               "_id": "62a18bdc60f1f2213f2efdsfgsdgf9fc9kjaldfjkfk",
               "user": "62a18a7d256707a576b02368",
               "title": title,
               "description": description,
               "tag": tag,
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          };
          setNotes(notes.concat(note));
          console.log(notes);
     }

     // Delete a note
     const deleteNote = (id) => {
          // TODO: API CALL
          const newNotes = notes.filter((note) => { return note._id !== id });
          setNotes(newNotes);
     }

     // Edit a note
     const editNote = async (id, title, description, tag) => {
          // TODO: API CALL

          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
               method: 'POST', // *GET, POST, PUT, DELETE, etc.
               headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMThhN2QyNTY3MDdhNTc2YjAyMzY4In0sImlhdCI6MTY1NDc1MzkxN30.zLLVBA63Tilo2-j__ScSwlZuxrQnVMuTOgNsevSNQzc'
               },
               body: JSON.stringify({ title, description, tag })
          });

          const json = response.json();

          // Logic to edit in client
          for (let index = 0; index < notes.length; index++) {
               let element = notes[index];
               if (element._id === id) {
                    return (element.title = title, element.description = description, element.tag = tag)
               }
          }

     }





     return (
          <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
               {props.children}
          </NoteContext.Provider>
     );
}


export default NoteState;