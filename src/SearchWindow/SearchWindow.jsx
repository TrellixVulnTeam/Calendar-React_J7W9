import React, { useState } from 'react';

export const SearchWindow = ({onSearch}) => {
    const [inputMonthSearch, setInputMonthSearch] = useState('');
    const [inputYearSearch, setInputYearSearch] = useState('');
    const [searchError, setSearchError] = useState(false);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 'November', 
        'December'];
    const monthNamesLower = ['january', 'february', 'march', 'april', 'may', 
        'june', 'july', 'august', 'september', 'october', 'november', 
        'december'];
    const monthNamesUpper = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 
        'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 
        'DECEMBER'];
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const monthAbbreviationsLower = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 
        'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    const monthAbbreviationsUpper = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 
        'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
    const monthNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 
        '10', '11', '12'];
                            
    return (
        <>
            <div id="searchWindow">
                <div>
                    <input 
                        className = {searchError ? 'searchError' : ''}
                        value = {inputMonthSearch}
                        onChange = {e => setInputMonthSearch(e.target.value)}
                        id = "inputDateSearch"
                        placeholder = "Month"
                    />
                </div>
                <div>
                    <input 
                        className = {searchError ? 'searchError' : ''}
                        value = {inputYearSearch}
                        onChange = {e => setInputYearSearch(e.target.value)}
                        id = "inputDateSearch"
                        placeholder = "Year"
                    />
                </div>
                <button 
                    onClick = {() => {
                        let indexOfInputMonthSearch = '0';
                        if(inputMonthSearch && inputYearSearch && Number.isInteger(parseInt(inputYearSearch))){
                            setSearchError(false);
                            let yearDifference = new Date().getFullYear();
                            yearDifference -= inputYearSearch;

                            let monthDifference = new Date().getMonth();
                            if(monthNames.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                    monthNames.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthNumbers.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                    monthNumbers.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthNamesLower.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                    monthNamesLower.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthNamesUpper.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                    monthNamesUpper.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthAbbreviations.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                monthAbbreviations.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthAbbreviationsLower.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                monthAbbreviationsLower.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            else if(monthAbbreviationsUpper.includes(inputMonthSearch)){
                                indexOfInputMonthSearch = 
                                monthAbbreviationsUpper.indexOf(inputMonthSearch.split(', ')[0]);
                            }
                            monthDifference -= indexOfInputMonthSearch;

                            // negative value of difference gives render of dates back
                            // and positive forward
                            onSearch(yearDifference * 12 + monthDifference);
                            setInputMonthSearch('');
                            setInputYearSearch('');
                        }
                        else{
                            setSearchError(true);
                        }
                    }}
                    id="saveButton">Search
                </button>
                <button 
                    onClick = {() => {
                        onSearch(0);
                    }}
                    id="saveButton">Back
                </button>
            </div>
        </>
    );
};