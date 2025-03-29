import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateSelector = ({ selectedDate, onDateChange }) => {
  const minDate = new Date(2000, 0); // Reasonable minimum date
  const maxDate = new Date();

  return (
    <div className="date-selector text-center h-20">
      <h2 className="text-white mb-2">Filter by Month/Year</h2>
      <DatePicker
        inline= {true}
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="MM/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        showMonthDropdown
        showYearDropdown
        className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
      />
    </div>
  );
};

export default DateSelector;
