import { useState } from "react";
import ExpenseList from "./ExpenseList";

// State management for form fields
const AddExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

//update all input fields state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    };
    
    
    //this is to reset the input fields after adding a transaction
    setFormData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };
  


  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <p className="text-white">{formData.name}</p>
        <form onSubmit={handleAddTransaction} className="bg-gray-200 z-1 p-6 rounded-lg shadow-md w-lg top-25 mb-8 absolute left-335">
         
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.name}
              name="name"
              id="name"
              className="w-full p-2 border rounded text-black focus:text-black focus:none focus:outline-none border-solid border-2 border-gray-300"
              required
            />
          </div>
          
          
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.category}
              name="category"
              id="category"
              className="w-full p-2 border rounded text-black focus:text-black focus:none focus:outline-none border-solid border-2 border-gray-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              onChange={handleChange}
              value={formData.date}
              name="date"
              id="date"
              className="w-full p-2 border rounded text-gray-500 focus:text-gray-900 focus:none focus:outline-none border-solid border-2 border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.amount}
              name="amount"
              id="amount"
              step="0.01"
              className="w-full p-2 border rounded text-black focus:text-black focus:none focus:outline-none border-solid border-2 border-gray-300"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Add +
        </button>
      </form>
      <ExpenseList />
      
    </div>
  );
};

export default AddExpense;