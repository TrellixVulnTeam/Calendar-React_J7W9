import React, { useState } from 'react';

export const NoteWindow = () => {
    const [noteWindowText, setNoteWindowText] = useState(localStorage.getItem('noteWindowText'));
    return (
        <>
            <textarea
                id="inputNoteWindow"
                placeholder="Write your note here..."
                value={noteWindowText}
                onChange={(e) => {
                    setNoteWindowText(e.target.value);
                    localStorage.setItem('noteWindowText', e.target.value);
                }}
            /> 
        </>
    );
}