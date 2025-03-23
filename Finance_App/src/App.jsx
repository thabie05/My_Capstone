import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import AddExpenseFrom from "./components/AddExpenseFrom";
import AddIncomeForm from "./components/AddIncomeForm";


const App= () => {

  const [hideForm, setHideForm] = useState(true)

  // State management for transactions list
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  // Load transactions from local storage on component mount
  useEffect(() => {
    const storedIncome = localStorage.getItem("moneyIn");
    const storedExpenses = localStorage.getItem("moneyOut");
    
    if (storedIncome) setIncomeTransactions(JSON.parse(storedIncome));
    if (storedExpenses) setExpenseTransactions(JSON.parse(storedExpenses));
  }, []);

  const toggleForm = () => {
    setHideForm(!hideForm)
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <TotalAmount 
        incomeTransactions={incomeTransactions}
        expenseTransactions={expenseTransactions}
      />
      
      <AddIncomeForm
        incomeTransactions={incomeTransactions}
        setIncomeTransactions={setIncomeTransactions}
      />
      
      <AddExpenseFrom
        expenseTransactions={expenseTransactions}
        setExpenseTransactions={setExpenseTransactions}
      />

      <ExpenseList 
      transactions={expenseTransactions}
      toggleForm={toggleForm}
      setHideForm={setHideForm}
      hideForm={hideForm}
       />
    </div>
  );
};

export default App;