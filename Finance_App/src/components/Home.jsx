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
    
    <div>
        <h1 className="text-4xl font-bold text-center">Expense Tracker</h1>
        <div className="flex gap-30 max-w-[1920px] mx-auto flex-wrap justify-center">
          <div>
            <DateSelector 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
            <TotalAmount 
              incomeTransactions={incomeTransactions}
              expenseTransactions={expenseTransactions}
            />

        </div>
      <div className="flex gap-3 justify-center flex-wrap">

        <div className="flex gap-30 justify-center flex-wrap">
          <IncomeList 
            transactions={filterTransactionsByDate(incomeTransactions)}
            onRemove={(index) => handleRemoveTransaction('income', index)}
            setTransactions={setIncomeTransactions}
            toggleForm={toggleIncomeForm}
            hideForm={hideIncomeForm}
          />
          <ExpenseList 
            transactions={filterTransactionsByDate(expenseTransactions)}
            onRemove={(index) => handleRemoveTransaction('expense', index)}
            setTransactions={setExpenseTransactions}
            toggleForm={toggleExpenseForm}
            hideForm={hideExpenseForm}
          />
        </div>
      
        <div className="absolute left-160 top-100 flex gap-3 justify-center">

          <AddExpenseForm
            expenseTransactions={expenseTransactions}
            setExpenseTransactions={setExpenseTransactions}
            hideForm={hideExpenseForm}
            toggleForm={toggleExpenseForm}
          />

          <AddIncomeForm
            incomeTransactions={incomeTransactions}
            setIncomeTransactions={setIncomeTransactions}
            hideForm={hideIncomeForm}
            toggleForm={toggleIncomeForm}
          />

        </div>

      </div>
      
      </div>
      
    </div>
  );
};

export default Home;