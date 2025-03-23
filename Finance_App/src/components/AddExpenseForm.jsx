import React, { useState } from "react";


const AddExpenseForm = ({ hideForm, toggleForm, setExpenseTransactions }) => {

   // State management for form fields
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

  //Submit the form and add a new transaction to the list of transactions and display them in the expense list
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newExpense = {
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    };

    //this is to update the list of transactions with the new transaction
    setExpenseTransactions((prevTransactions) => {
      const updatedExpense = [...prevTransactions, newExpense];
      localStorage.setItem("moneyOut", JSON.stringify(updatedExpense));
      return updatedExpense;
    });
    
    
    //this is to reset the input fields after adding a transaction
    setFormData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 ">
      { !hideForm &&
        (<form onSubmit={handleAddTransaction} className="bg-gray-200 z-1 p-6 rounded-3xl shadow-md max-w-lg w-full mx-auto ">
            <div className="flex justify-between" id="close">
            <button
          onClick={toggleForm}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >Close</button>
        <h3 className="text-lg font-medium text-gray-700 mb-1">Add Expense</h3>
        </div>
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
       </form>)}
    </div>
  )
}

export default AddExpenseForm;
