import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
export const DatePicker = ({setDateReq}) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    return (
        <div className='ml-2'>
        <h5>Дата</h5>
      <ReactDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateReq({from: null, to: null})
          setDateRange(update);
          const startDate = update[0];
          const endDate = update[1];
        
          if (startDate) {
            const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
            setDateReq((prevDateReq) => ({ ...prevDateReq, from: formattedStartDate }));
          }
        
          if (endDate) {
            const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
            setDateReq((prevDateReq) => ({ ...prevDateReq, to: formattedEndDate }));
          } 
        }}
        isClearable={true}
      />
      </div>
    );
  };