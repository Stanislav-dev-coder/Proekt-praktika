import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { array } from 'prop-types';

// import './calendar.styl'



const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [check, setCheck] = useState(false);

  const [day, setDay] = useState('')
  const [firstDay, setFirst] = useState('')
  const [lastDay, setLast] = useState('')
  const [firstMonth, setFirstMonth] = useState('')
  const [lastMonth, setLastMonth] = useState('')
  const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
              'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',]
  let today

  const onChange = date => {
    setDate(date);
    const addDate = () => {
      if (check === false) {
        today = date.getDate()
        setDay(date.setDate(today))
        setDay(date.getDate()) 
        date.setDate(today)
        console.log(day)
      } else {
        today = date.getDate()
        setDay(date.setDate(today)) 
        setFirst(date.setDate(today-3)) 
        setFirst(date.getDate())
        setFirstMonth(month[date.getMonth()])
        date.setDate(today)
        console.log(firstDay)
        console.log(firstMonth)

        setLast(date.setDate(today+3))
        setLast(date.getDate())
        setLastMonth(month[date.getMonth()])
        date.setDate(today)
        console.log(lastDay)
        console.log(lastMonth)
      }
    }
    addDate();
  }




  return (
    <div>
      <Calendar minDate={new Date()} onChange={onChange} value={date}/>

      
      
      <input type="checkbox" onChange={() => {
        setCheck(!check)
        
        }}/>
      <span> ± 3 дня (гибкие даты)</span>
      {console.log(check)}
      {check ? (
        <input type="text" value={'C ' + firstDay + ' ' + firstMonth + ' по ' + lastDay + ' ' + lastMonth}/>
      ) : (
        <input type="text" value={ day + ' ' + month[date.getMonth()]}/>
      )}
      
    </div>
  );
}


export default MyCalendar
