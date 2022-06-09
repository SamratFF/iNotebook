import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
     const context = useContext(NoteContext);
     const { notes, setNotes } = context;

     return (
          <div className="yourNote my-5 row">
               <h1 className="">Your Notes</h1>
               {notes.map((notes) => {
                    // return `Title --> "${notes.title}",  Description --> "${notes.description}",  Tag --> "${notes.tag}"`;
                    return <NoteItem key={notes._id} note={notes} />;
               })}
          </div>
     )
}

export default Notes