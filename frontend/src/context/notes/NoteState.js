import React, { useState } from 'react';
import NoteContext from "./NoteContext";

const NoteState = (props) => {
     const notesInitial = [
          {
               "_id": "62a18bdc60f12213f2ef9fc9(BY_ME)",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          },
          {
               "_id": "62a18bdc60f12g213f2ef9fc9d",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          },
          {
               "_id": "62a18bdc60fsdf12213f2ef9fc9s",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          },
          {
               "_id": "62a18bdc60f12g213f2ef9fc9h",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          },
          {
               "_id": "62a18bdc6d0f12213f2ef9fc9j",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          },
          {
               "_id": "62a18bdc60f1f2213f2ef9fc9k",
               "user": "62a18a7d256707a576b02368",
               "title": "New Note",
               "description": "This is my NEW note",
               "tag": "General",
               "date": "2022-06-09T05:57:48.299Z",
               "__v": 0
          }
     ];

     const [notes, setNotes] = useState(notesInitial)

     return (
          <NoteContext.Provider value={{ notes, setNotes }}>
               {props.children}
          </NoteContext.Provider>
     )
}


export default NoteState;