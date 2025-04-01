const ExpenseList = ({transactions, onRemove, hideForm, toggleForm, ...props }) => {
  return (
    <div className="max-w-full p-2 md:p-4">
       <div className="overflow-x-auto rounded-3xl shadow-lg bg-[#252f53be] ">
       <h2 className="text-xl font-semibold text-white p-4 text-center">Expenses</h2>
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#000000bd]">
            <tr>
              <th className="px-3 py-3 sm:px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-3 py-3 sm:px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
              <th className="px-3 py-3 sm:px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-3 py-3 sm:px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
              <th className="px-3 py-3 sm:px-4 text-center text-xs font-medium text-white uppercase tracking-wider">delete</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-600">
      {transactions.map((transaction, index) => (
        <tr key={index} className="hover:bg-gray-700 transition-colors duration-150">
         
          <td className="px-3 py-4 sm:px-4 whitespace-nowrap text-sm text-gray-100">
            
            {transaction.name}
          </td>
        
                <td className="px-3 py-4 sm:px-4 whitespace-nowrap text-sm text-gray-400">
                  {transaction.category}
                  </td>
                <td className="px-3 py-4 sm:px-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-4 sm:px-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  -R{parseFloat(transaction.amount || 0).toFixed(2)}
                </td>
                <td className="px-3 py-4 sm:px-4 whitespace-nowrap text-center">
          <button 
              onClick={() => onRemove(index)}
              className="bg-red-600 text-white px-2 py-1 text-xs rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label={`Delete transaction ${transaction.name}`}
            >
              X
            </button>
          </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No Expense transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <div className="bg-[#000000bd] p-3 flex justify-center items-center">
          <span className="">{hideForm ? "Add " : "Adding Expense..."}</span>
        { hideForm && <button
        onClick={toggleForm}
        className="bg-blue-600  bottom-1 size-15 text-center text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
        >
        +
        </button>}<span className="">{hideForm ? " Expense" : ""}</span>
        </div>
      </div>
    </div>
  )
}

export default ExpenseList;
