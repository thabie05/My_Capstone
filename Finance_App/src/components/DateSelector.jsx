import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// The selected date is passed as a prop, and the onDateChange function is called when the user selects a new date
const DateSelector = ({ selectedDate, onDateChange }) => {
  const minDate = new Date(2000, 0); // Reasonable minimum date
  const maxDate = new Date();

  return (
    <div className="date-selector text-center p-4 mb-4 md:mb-0">
      <h2 className="text-white text-lg md:text-xl mb-2 font-semibold">Filter by Month/Year</h2>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="MM/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        showMonthYearPicker
        className="p-2 rounded-lg bg-gray-700 text-center text-white border border-gray-600 w-full max-w-xs mx-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholderText="Select Month/Year"
      />
      <br />
      <button
           onClick={() => onDateChange(null)} // Clear the date
           className="mt-2 text-sm text-blue-300 hover:text-blue-500"
         >
           Clear Filter
         </button>
    </div>
  );
};

export default DateSelector;
