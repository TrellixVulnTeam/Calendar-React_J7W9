import React, { useState } from 'react';

export const InputForToDoModal = ({onSave, onClose}) => {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState(false);
    return (
        <>
            <h2>New Event</h2>
            <input 
                className = {error ? 'error' : ''}
                value = {inputText}
                onChange = {e => setInputText(e.target.value)}
                id = "eventTitleInput"
                placeholder = "Event Title"
            />
            <button 
                onClick = {() => {
                    if(inputText){
                        setError(false);
                        onSave(inputText);
                    }
                    else{
                        setError(true);
                    }
                }}
                id="saveButton">Save
            </button>
            <button 
                onClick = { () => onClose() }
                id="cancelButton">Cancel
            </button>
        </>
    );
};