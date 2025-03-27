const TotalAmount = ({ incomeTransactions, expenseTransactions }) => {

  const totalIncome = incomeTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalExpense = expenseTransactions.reduce((sum, transaction) => {
    return sum + (parseFloat(transaction.amount) || 0);
  }, 0);

  const totalSaved = totalIncome - totalExpense;

  return (
    <div className="totalAmount  ml-12 mt-40 min-w-sm text-center gap-20 flex flex-col max-h-110 ">
      <div className=''>
      <h1><input type="date" /></h1></div>
      <div className="bg-linear-to-r from-[#434e55af] flex flex-col items-center justify-center gap-10 to-[#000000bd]  w-76 h-110 rounded-3xl shadow-lg bottom-76">
      <h3 className="text-2xl font-bold pt-8 text-green-500">
        Total Income:<br/> R{totalIncome.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-red-500">
        Total Expense:<br/> R{totalExpense.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold pb-8 text-blue-300">
        Total Saved:<br/> R{totalSaved.toFixed(2)}
      </h3>
      </div>
      
      
    </div>
  );
};

export default TotalAmount;