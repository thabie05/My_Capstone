const ExpenseList = ({transactions, hideForm, toggleForm}) => {
  return (
    <div>
       <div className="overflow-x-auto rounded-3xl shadow absolute left-335 right-30 top-25 max-w-4xl mx-auto w-lg">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  -R{parseFloat(transaction.amount).toFixed(2)}
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
        </button>}<span className="relative left-55">{hideForm ? "Expense" : ""}</span>
        </div>
      </div>
    </div>
  )
}

export default ExpenseList;
