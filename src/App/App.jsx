import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { InputForToDoModal, EventsForDay } from '../ToDoForDayModal';
import { useDate } from '../hooks/useDate';
import { SearchWindow } from '../SearchWindow';
import { NoteWindow } from '../NoteWindow';

export const App = () => {
    
    const [counterWhenScrolled, setCounterWhenScrolled] = useState(0);
    const [monthCounterWhenScrolled, setMonthCounterWhenScrolled] = useState(0);
    const [dayClicked, setDayClicked] = useState();

    // useState for rerendering and chaning the state of indernal types of some other useStates
    // cannot use forceUpdate because of lack of classes and functional paradigm used
    const [rerender, setRerender] = useState(true);
    const rerenderPlz = () => {
        if(rerender){
            setRerender(false);
        }
        else{
            setRerender(true);
        }
    }

    // localStorage.getItem() will get error if there is no objects under right key 
    // JSON.parse parses recieved string to structure inside of it
    const [events, setEvents] = 
        useState(localStorage.getItem('events') ? 
            JSON.parse(localStorage.getItem('events')) : []);
    // function for finding an events structure for specific date
    const eventForDate = (date) => { return (events.find((e) => e.date === date)) };

    // saves list of Items under key 'events' in localStorage
    useEffect(() =>{
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    // useState that has been used for operating on a go of stored events in localStorage
    const [dummyEventsForDate, setDummyEventsForDate] = useState();

    // reference assignment for grid objects
    const {daysArray, dateDisplay} = useDate(events, counterWhenScrolled, monthCounterWhenScrolled);

    return(
        <>  
            <div id="mainContainer">
                <div id="gridContainer">
                    <div id ="weekdaysDisplay">
                        <div>Monday</div>
                        <div>Tuesday</div>
                        <div>Wednesday</div>
                        <div>Thursday</div>
                        <div>Friday</div>
                        <div>Saturday</div>
                        <div>Sunday</div>
                    </div>
                    <div id="calendarGrid" 
                        onWheel={(e)=>{
                            // default onWheel tracks mouse wheel movement from both sides
                            // because of that if statement was included where condition act as a counter
                            if(e.nativeEvent.wheelDelta > 0){
                                if(counterWhenScrolled < 3){
                                    setCounterWhenScrolled(counterWhenScrolled + 1);
                                }
                                else{
                                    setMonthCounterWhenScrolled(monthCounterWhenScrolled + 1);
                                    setCounterWhenScrolled(0);
                                }
                            }
                            else{
                                if(counterWhenScrolled > -3){
                                    setCounterWhenScrolled(counterWhenScrolled - 1);
                                }
                                else{
                                    setMonthCounterWhenScrolled(monthCounterWhenScrolled - 1);
                                    setCounterWhenScrolled(0);
                                }
                            }
                        }}>
                        {
                            daysArray.map((day, index) => (
                                <Day
                                    key = {index}   
                                    day = {day}
                                    onClick = {() => {
                                        setDayClicked(day.date);
                                        // if there is an event for certain date: 
                                        //    1) event saved in dummy
                                        //    2) event deleted from array
                                        //    3) updated list of events are saved in localStorage
                                        //    4) rerender happends for events to update as useState
                                        if(eventForDate(day.date)){
                                            setDummyEventsForDate(eventForDate(day.date));
                                            events.splice(events.indexOf(eventForDate(day.date)), 1);
                                            localStorage.setItem('events', JSON.stringify(events));
                                            rerenderPlz();
                                        }
                                        else{
                                            setDummyEventsForDate({ input: [], date: day.date });
                                        }
                                    }}
                                /> 
                            ))
                        }
                    </div>
                </div> 
                <div id = "utilityContainer">
                    <CalendarHeader 
                        dateDisplay={dateDisplay}
                        onNext={()=>{
                            setMonthCounterWhenScrolled(monthCounterWhenScrolled + 1);
                            setCounterWhenScrolled(0);
                        }}
                        onBack={()=>{
                            setMonthCounterWhenScrolled(monthCounterWhenScrolled - 1);
                            setCounterWhenScrolled(0);
                        }}
                    />
                    <SearchWindow
                        onSearch = {(calculatedDifference) => {
                            setMonthCounterWhenScrolled(calculatedDifference);
                        }}
                    />
                    <NoteWindow/>
                </div>
            </div>
            {
                dayClicked &&
                <>
                    <div id="inputForToDoModal">
                        <InputForToDoModal
                            onSave = { (inputStep) => {
                                dummyEventsForDate.input.push(inputStep);
                                rerenderPlz();
                            }}
                            onClose = { () => {
                                setDayClicked(false);
                                if(dummyEventsForDate.input.length !== 0){
                                    setEvents([...events, dummyEventsForDate]);
                                }
                            }}
                        />
                        {
                            dummyEventsForDate.input.map((dayEvent, index) => (
                                <EventsForDay
                                    key = {index}
                                    index = {index}
                                    dayEvent = {dayEvent}
                                    onDelete = { () => {
                                        dummyEventsForDate.input.splice(index, 1);
                                        rerenderPlz();
                                    }}
                                />
                            ))
                        }
                    </div>
                    <button id="modalBackDrop"
                        onClick = { () => {
                            setDayClicked(false);
                            if(dummyEventsForDate.input.length !== 0){
                                setEvents([...events, dummyEventsForDate]);
                            }
                        }}>
                    </button>
                </>
            }
        </>
    );
};