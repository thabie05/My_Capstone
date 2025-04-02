const TotalAmount = ({ incomeTransactions, expenseTransactions, selectedDate }) => {

  const filterTransactions = (transactions) => {
    if (!selectedDate) return transactions;
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  const calculateTotal = (transactions) => {
    return filterTransactions(transactions).reduce(
      (sum, transaction) => sum + (parseFloat(transaction.amount) || 0),
      0
    );
  };

  const filteredIncome = calculateTotal(incomeTransactions);
  const filteredExpense = calculateTotal(expenseTransactions);
  const totalSaved = filteredIncome - filteredExpense;

  return (
    <div className="totalAmount p-4 w-full">
      <div className="bg-gradient-to-r from-[#434e55af] to-[#000000bd] w-full max-w-sm mx-auto rounded-3xl shadow-lg p-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h3 className="text-xl font-bold md:text-2xl text-green-500">
        Total Income:<br/> R{filteredIncome.toFixed(2)}
      </h3>
      <hr className="w-3/4 border-gray-600 my-1" />
      <h3 className="text-xl md:text-2xl font-bold text-red-500">
        Total Expense:<br/> R{filteredExpense.toFixed(2)}
      </h3>
      <hr className="w-3/4 border-gray-600 my-1" />
      <h3 className="text-xl md:text-2xl font-bold pb-8 text-blue-300">
        Total Saved:<br/> <span className={totalSaved >= 0 ? 'text-blue-300' : 'text-orange-400'}>
              R{totalSaved.toFixed(2)}
            </span>
      </h3>
      </div>
      
      </div>
    </div>
  );
};

export default TotalAmount;