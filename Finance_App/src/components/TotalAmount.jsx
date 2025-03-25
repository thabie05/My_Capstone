const TotalAmount = ({ incomeTransactions, expenseTransactions }) => {

  const totalIncome = incomeTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalExpense = expenseTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalSaved = totalIncome - totalExpense;

  return (
    <div className="totalAmount bg-linear-to-r from-[#434e55af] to-[#000000bd] ml-12 rounded-3xl shadow-lg mt-40 min-w-sm text-center p-10 gap-20 flex flex-col max-h-110 ">
      <h3 className="text-2xl font-bold text-green-500">
        Total Income:<br/> R{totalIncome.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-red-500">
        Total Expense:<br/> R{totalExpense.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-blue-300">
        Total Saved:<br/> R{totalSaved.toFixed(2)}
      </h3>
      
    </div>
  );
};

export default TotalAmount;