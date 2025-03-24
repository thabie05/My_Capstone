import { useEffect, useState } from "react";
import { BrowserRouter as router, Routes, Route, Link } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import AddExpenseForm from "./components/AddExpenseForm";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeList from "./components/IncomeList";




const App = () => {
  // Separate states for both forms
  const [hideIncomeForm, setHideIncomeForm] = useState(true);
  const [hideExpenseForm, setHideExpenseForm] = useState(true);

  // State management for transactions
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

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

  return (
    
    <div className="flex flex-col gap-3 justify-center flex-wrap">
      <div className="flex gap-30 justify-center flex-wrap">
      <TotalAmount 
        incomeTransactions={incomeTransactions}
        expenseTransactions={expenseTransactions}
      />
      <IncomeList 
        transactions={incomeTransactions}
        setTransactions={setIncomeTransactions}
        toggleForm={toggleIncomeForm}
        hideForm={hideIncomeForm}
      />
      <ExpenseList 
        transactions={expenseTransactions}
        setTransactions={setExpenseTransactions}
        toggleForm={toggleExpenseForm}
        hideForm={hideExpenseForm}
      />
      </div>
      
      
      <div className="flex justify-center gap-0">

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
  );
};

export default App;