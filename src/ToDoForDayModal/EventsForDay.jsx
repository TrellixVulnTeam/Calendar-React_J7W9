import React from 'react';

export const EventsForDay = ({index, dayEvent, onDelete}) => {
    return(
        <div>  
            <p id='eventText'> {dayEvent} </p>
            <button 
                id='deleteButton'
                onClick = {onDelete}> {index}
            </button>
        </div> 
    );
};