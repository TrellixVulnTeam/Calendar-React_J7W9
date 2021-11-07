import React from 'react';

export const Day = ({day, onClick}) => {
    let className;
    if(day.isOutsideDay){
        className = 'outsideDay';
    }
    else if(day.isCurrentDay){
        className = 'currentDay';
    }
    else{
        className = 'day';
    }
    return(
        <div onClick={onClick} className={className}>  
            {day.value}
            {day.event && <div className='event'>{' '}</div>}
        </div> 
    );
};