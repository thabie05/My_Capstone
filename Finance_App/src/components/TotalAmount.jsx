const TotalAmount = ({ incomeTransactions, expenseTransactions }) => {
  const totalIncome = incomeTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalExpense = expenseTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalSaved = totalIncome - totalExpense;

  return (
    <div className="p-4 bg-gray-100 rounded-3xl shadow-lg mb-6 w-sm text-center">
      <h3 className="text-2xl font-bold text-green-500">
        Total Income: R{totalIncome.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-red-500">
        Total Expense: R{totalExpense.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-blue-500">
        Total Saved: R{totalSaved.toFixed(2)}
      </h3>
      
    </div>
  );
};

export default TotalAmount;