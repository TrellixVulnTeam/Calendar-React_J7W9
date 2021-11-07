import { useEffect, useState } from "react";

export const useDate = (events, counterWhenScrolled, monthCounterWhenScrolled) => {

    // function for finding an event for specific date
    const eventForDate = (date) => { return (events.find((e) => e.date === date)) };
    // variable for month/year display on top left of a grid
    const [dateDisplay, setDateDisplay] = useState('');
    // array for the days grid 
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() =>{
        // weekdays array needed to get right counting from certain day
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const currentDate = new Date(); // current date in full format
        // correction of a loaded month value if page was scrolled
        if(monthCounterWhenScrolled !== 0){
            currentDate.setMonth(new Date().getMonth() - monthCounterWhenScrolled);
        }
        const currentDay = currentDate.getDate(); // current day as integer
        const currentMonth = currentDate.getMonth(); // current month as index (January is 0)
        const currentYear = currentDate.getFullYear(); // current year as integer
        // first day of current month in full format
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        // last day of current month by tracking -1 day of next month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 
        // first day of current month in [day(as word), month/day/year] format
        const firstDayOfMonthAsString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        // number of padding days that gets splitted from 
        // firstDayOfMonthAsString and searched as index in weekdays
        let paddingDays = weekdays.indexOf(firstDayOfMonthAsString.split(', ')[0]) + counterWhenScrolled*7;
        if(counterWhenScrolled % 4 === 0){
            paddingDays = weekdays.indexOf(firstDayOfMonthAsString.split(', ')[0]);
        }
        // assign text of a shown month/year (top left on a grid)
        setDateDisplay(`${currentDate.toLocaleDateString('en-us', {month: 'long'})} 
            ${currentDate.getFullYear()}`);

        const dummyDaysArr = [];
        for(let i=1; i<= 42; i++){
            // date of a sqare div in format month/days/years
            const dayString = `${currentMonth + 1}/${i - paddingDays}/${currentYear}`;
            if(i <= paddingDays){
                dummyDaysArr.push({
                    value: new Date(currentYear, currentMonth, 0).getDate() + i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === currentDay && monthCounterWhenScrolled === 0,
                    isOutsideDay: true,
                    date: dayString,
                });
            }
            else if(i > paddingDays && i < paddingDays + daysInMonth + 1){
                dummyDaysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === currentDay && monthCounterWhenScrolled === 0,
                    isOutsideDay: false,
                    date: dayString,
                });
            }
            else{
                dummyDaysArr.push({
                    value: i - paddingDays - daysInMonth,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === currentDay && monthCounterWhenScrolled === 0,
                    isOutsideDay: true,
                    date: dayString,
                });
            }
        }
        setDaysArray(dummyDaysArr);
    }, [events, counterWhenScrolled, monthCounterWhenScrolled]);

    return{
        daysArray,
        dateDisplay
    }
};