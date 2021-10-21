import React, { useState } from 'react';

export const NewEventModal = ({onSave, onClose}) => {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState(false);
    return (
        <>
            <div id="newEventModal">
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
                    onClick = { onClose }
                    id="cancelButton">Cancel
                </button>
            </div>
            <div id="modalBackDrop"></div>
        </>
    );
};