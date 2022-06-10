import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {

     const context = useContext(NoteContext);
     const { deleteNote } = context;

     const { note } = props;
     return (
          <div className='col-md-3'>
               <div className="card my-3">
                    <div className="card-body">
                         <div className="d-flex align-items-center">
                              <h5 className="card-title">{note.title}</h5>
                              <div className="icons position-absolute end-0 me-3">
                                   <i className="fa-solid fa-trash-can mx-1" onClick={() => { deleteNote(note._id) }}></i>        {/* DELETE ICON */}
                                   <i className="fa-solid fa-pen-to-square mx-1"></i>    {/* EDIT ICON */}
                              </div>
                         </div>
                         <p className="card-text">{note.description}</p>
                    </div>
               </div>
          </div >
     )
}

export default NoteItem