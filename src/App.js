import React, { useState, useEffect } from 'react';
import moment from 'moment';
import background1 from './background1.jpg';
import background2 from './background2.jpg';
import background3 from './background3.jpg';
import background4 from './background4.jpg';
import background5 from './background5.jpg';
import background6 from './background6.jpg';
import './App.css';
import { GiCancel } from 'react-icons/gi';


function CountdownTimer({ date, time, reason, onDelete, index }) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const countdownValue = moment(date + ' ' + time).diff(moment(), 'seconds');
    setCountdown(countdownValue);

    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  const countdownString = moment.utc(Math.abs(countdown) * 1000).format('HH:mm:ss');
  const countdownDisplay = countdown < 0 ? '-' + countdownString : countdownString;
  const setdateString = moment(date).format('MM/DD');

  return (
    <div>
      <div className='text-left text-white font-bold text-xl'>{reason}</div>        
 

      <div className="bg-white shadow-md rounded px-3 pt-3 pb-8 mb-4">     
      <GiCancel size={12} className='text-red-500 cursor-pointer left-64 ml-32 mb-2' onClick={() => onDelete(index)} ></GiCancel>
        <div className="text-4xl font-bold text-center text-blue-500">{countdownDisplay}</div>
        <div className='-mb-4 text-xs text-gray-500 ml-28'>
          {setdateString}
        </div>
      </div>
    </div>
  );
}



function App() {
  const [countdowns, setCountdowns] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('00:00');
  const [reason, setReason] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    const backgrounds = ['background1.jpg', 'background2.jpg'];
    const storedBackground = localStorage.getItem('background');

    if (storedBackground) {
      setBackground(storedBackground);
    } else {
      const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      localStorage.setItem('background', randomBackground);
      setBackground(randomBackground);
    }
  }, []);

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function handleTimeChange(event) {
    setSelectedTime(event.target.value);
  }

  function handleReasonChange(event) {
    setReason(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newCountdown = { date: selectedDate, time: selectedTime, reason: reason };
    setCountdowns((countdowns) => [...countdowns, newCountdown]);
    setSelectedDate('');
    setSelectedTime('00:00');
    setReason('');
  }

  function handleDelete(index) {
    setCountdowns((countdowns) => countdowns.filter((countdown, i) => i !== index));
  }

  const backgrounds = [background1, background2, background3, background4, background5, background6];
  const selectedBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${background4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}
    >
      <div className='font-bold text-4xl text-white bg-gray-500 bg-opacity-30 rounded-md mt-8'>Calm Task</div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            id="date"
            name="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time:
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            id="time"
            name="time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="reason">
            Reason:
          </label>
          <input
            type="text"
            value={reason}
            onChange={handleReasonChange}
            id="reason"
            name="reason"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Set Countdown
          </button>
        </div>
      </form>
      {countdowns.map((countdown, index) => (
        <CountdownTimer
          key={index}
          date={countdown.date}
          time={countdown.time}
          reason={countdown.reason}
          onDelete={() => {
            const updatedCountdowns = countdowns.filter(
              (c, i) => i !== index
            );
            setCountdowns(updatedCountdowns);
          }}
        />
      ))}
    </div>
  );
  
}

export default App
;
