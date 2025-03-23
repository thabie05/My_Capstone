import { useEffect, useState } from "react";

const AddIncomeForm = ({ hideForm, toggleForm, setIncomeTransactions }) => {
  const [formIncome, setFormIncome] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormIncome((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newIncome = {
      name: formIncome.name,
      amount: formIncome.amount,
      category: formIncome.category,
      date: formIncome.date,
    };
    
    setIncomeTransactions((prevTransactions) => {
      const updatedIncome = [...prevTransactions, newIncome];
      localStorage.setItem("moneyIn", JSON.stringify(updatedIncome));
      return updatedIncome;
    });

    setFormIncome({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };
  


  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      

      {hideForm ? "" :
        <form onSubmit={handleAddTransaction} className="bg-gray-200 z-1 p-6 rounded-3xl shadow-md max-w-110 w-full w-lg mx-auto ">
          <div className="flex justify-between" id="close">
            <button
          onClick={toggleForm}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >Close</button>
        <h3 className="text-lg font-medium text-gray-700 mb-1">Add Income</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formIncome.name}
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
              value={formIncome.category}
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
              value={formIncome.date}
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
              value={formIncome.amount}
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
      </form>}

      
    </div>
  );
};

export default AddIncomeForm;