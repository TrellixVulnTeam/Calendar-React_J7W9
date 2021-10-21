import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal';
import { useDate } from '../hooks/useDate';

export const App = () => {

    const [monthCounterWhenScrolled, setMonthCounterWhenScrolled] = useState(0);
    const [dayClicked, setDayClicked] = useState();
    // localStorage.getItem() will get error if there is no objects under right key 
    // JSON.parse parses recieved string to actual code inside of it
    const [events, setEvents] = 
        useState(localStorage.getItem('events') ? 
            JSON.parse(localStorage.getItem('events')) : []);
    // function for finding an event for specific date
    const eventForDate = (date) => events.find(e => e.date === date);

    // saves list of Items under key 'events'
    useEffect(() =>{
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]); 

    // reference assignment for grid objects
    const {daysArray, dateDisplay} = useDate(events, monthCounterWhenScrolled);

    return(
        <>
            <div id="mainContainer">
                <CalendarHeader 
                    dateDisplay={dateDisplay}
                    onNext={()=>setMonthCounterWhenScrolled(monthCounterWhenScrolled + 1)}
                    onBack={()=>setMonthCounterWhenScrolled(monthCounterWhenScrolled - 1)}
                />  

                <div id ="weekdaysDisplay">
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>

                <div id="calendarGrid">
                    {daysArray.map((d, index) => ( 
                        <Day
                            key = {index}   
                            day = {d}
                            onClick = {() => {
                                if(d.value !== 'padding'){
                                    setDayClicked(d.date);
                                }
                            }}
                        /> 
                    ))}
                </div>
            </div>
            {
                dayClicked && !eventForDate(dayClicked) && 
                <NewEventModal
                    onClose = {() => setDayClicked(null)}
                    onSave = {title => {
                        setEvents([ ...events, { title, date: dayClicked }]);
                        setDayClicked(null);
                    }}  
                />
            }
            {
                dayClicked && eventForDate(dayClicked) && 
                <DeleteEventModal
                    eventText = {eventForDate(dayClicked).title}
                    onClose = {() => setDayClicked(null)}
                    onDelete = {() => {
                        setEvents(events.filter(e => e.date !== dayClicked));
                        setDayClicked(null);
                    }}  
                />
            }
        </>
    );
};