import React, { useState } from 'react';
import Calendar from 'react-calendar';
import FlexDate from './FlexDate.jsx';
import 'react-calendar/dist/Calendar.css';
import { array } from 'prop-types';


const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [firsDay, setFirst] = useState('')
  const [lastDay, setLast] = useState('')
  let today, day

  const onChange = date => {
    setDate(date);
    addDate();
  }

  const addDate = () => {
    today = date.getDate()
    day = date.setDate(today)
    day = date.getDate()
    date.setDate(today)
    console.log(day)
    
    setFirst(date.setDate(today-3)) 
    setFirst(date.getDate())
    date.setDate(today)
    console.log(firsDay)

    setLast(date.setDate(today+3))
    setLast(date.getDate())
    date.setDate(today)
    console.log(lastDay)
  }


  return (
    <div>
      <Calendar onChange={onChange} value={date}/>

      <FlexDate/>
      
      <input type="text" value={'C ' + firsDay + ' по ' + lastDay}/>
    </div>
  );
}

export default MyCalendar
