import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import TotalAmount from "./TotalAmount";
import AddExpenseForm from "./AddExpenseForm";
import AddIncomeForm from "./AddIncomeForm";
import IncomeList from "./IncomeList";
import DateSelector from "./DateSelector";




const Home = () => {
  // Separate states for both forms
  const [hideIncomeForm, setHideIncomeForm] = useState(true);
  const [hideExpenseForm, setHideExpenseForm] = useState(true);

  // State management for transactions
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [removeTransactions, setRemoveTransactions] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  // Toggle functions
  const toggleIncomeForm = () => setHideIncomeForm(!hideIncomeForm);
  const toggleExpenseForm = () => setHideExpenseForm(!hideExpenseForm);

   // Load transactions from local storage on component mount
   useEffect(() => {
    const storedIncome = localStorage.getItem("moneyIn");
    const storedExpenses = localStorage.getItem("moneyOut");
    
    if (storedIncome) setIncomeTransactions(JSON.parse(storedIncome));
    if (storedExpenses) setExpenseTransactions(JSON.parse(storedExpenses));
  }, []);

  // Add filtered transactions logic
  const filterTransactionsByDate = (transactions) => {
    if (!selectedDate) return transactions;
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  // Add remove transaction functionality
  const handleRemoveTransaction = (type, index) => {
  if (type === 'income') {
    const updated = incomeTransactions.filter((_, i) => i !== index);
    setIncomeTransactions(updated);
    localStorage.setItem("moneyIn", JSON.stringify(updated)); // Update storage
  } else {
    const updated = expenseTransactions.filter((_, i) => i !== index);
    setExpenseTransactions(updated);
    localStorage.setItem("moneyOut", JSON.stringify(updated)); // Update storage
  }
};

  return (
    
    <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 md:mb-10">Track My Expenses</h1>
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="w-full lg:w-1/4 lg:flex-shrink-0 mb-6 lg:mb-0">
            <DateSelector 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
            <TotalAmount 
              incomeTransactions={incomeTransactions}
              expenseTransactions={expenseTransactions}
              selectedDate={selectedDate}
            />

        </div>
      <div className="w-full lg:flex-grow">

        <div className="flex md:flex-nowrap flex-wrap gap-6 md:gap-8">
        <div className="md:w-full w-lg flex-grow">
        <AddIncomeForm
            incomeTransactions={incomeTransactions}
            setIncomeTransactions={setIncomeTransactions}
            hideForm={hideIncomeForm}
            toggleForm={toggleIncomeForm}
          />

          <IncomeList 
            transactions={filterTransactionsByDate(incomeTransactions)}
            onRemove={(index) => handleRemoveTransaction('income', index)}
            setTransactions={setIncomeTransactions}
            toggleForm={toggleIncomeForm}
            hideForm={hideIncomeForm}
          />
          </div>
          <div className="w-full">
        
          <AddExpenseForm
            expenseTransactions={expenseTransactions}
            setExpenseTransactions={setExpenseTransactions}
            hideForm={hideExpenseForm}
            toggleForm={toggleExpenseForm}
          />

            <ExpenseList 
            transactions={filterTransactionsByDate(expenseTransactions)}
            onRemove={(index) => handleRemoveTransaction('expense', index)}
            setTransactions={setExpenseTransactions}
            toggleForm={toggleExpenseForm}
            hideForm={hideExpenseForm}
          />

          
          </div>
        

        </div>

      </div>
      
      </div>
      
    </div>
  );
};

export default Home;