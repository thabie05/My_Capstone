import { useEffect, useState } from "react";

const TotalAmount = ({ transactions }) => {
  const total = transactions.reduce((sum, transaction) => {
    const amount = parseFloat(transaction.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="p-4 bg-gray-100 rounded-t-3xl shadow-md mb-6 w-sm text-center absolute top-34 right-20 left-20">
      <h3 className="text-2xl font-bold text-gray-800">
        Total Income: R{total.toFixed(2)}
      </h3>
    </div>
  );
};

const AddIncomeForm = () => {
  const [formIncome, setFormIncome] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const [hideForm, setHideForm] = useState(true)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedIncome = localStorage.getItem("income");
    if (storedIncome) {
      setTransactions(JSON.parse(storedIncome));
    }
  }, []);

  const toggleForm = () => {
    setHideForm(!hideForm);
  };
  

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
    
    setTransactions((prevTransactions) => {
      const updatedIncome = [...prevTransactions, newIncome];
      localStorage.setItem("transactions", JSON.stringify(updatedIncome));
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
      

      {!hideForm &&
        <form onSubmit={handleAddTransaction} className="bg-gray-200 z-1 p-6 rounded-3xl shadow-md w-lg top-25 mb-8 absolute left-335">
          <button
          onClick={toggleForm}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >Close</button>
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

      <TotalAmount transactions={transactions} />

      <div className="overflow-x-auto rounded-3xl shadow absolute left-5 right-30 top-25 max-w-4xl mx-auto w-lg">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.name}</td>
        
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium">
                  +R{parseFloat(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="bg-gray-500">
          <span className="relative left-45">{hideForm ? "Add" : ""}</span>
        { hideForm && <button
        onClick={toggleForm}
        className="bg-blue-600 border-7 border-gray-500 bottom-1 size-15 text-center text-white relative left-50 py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
        >
        +
        </button>}<span className="relative left-55">{hideForm ? "Income" : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default AddIncomeForm;