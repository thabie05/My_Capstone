import { useEffect, useState } from "react";
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

  return (
    <div className=" max-w-4xl w-full mx-auto p-6 flex gap-6">
      <TotalAmount 
        incomeTransactions={incomeTransactions}
        expenseTransactions={expenseTransactions}
      />
      <div>
      <ExpenseList 
        transactions={expenseTransactions}
        setTransactions={setExpenseTransactions}
        toggleForm={toggleExpenseForm}
        hideForm={hideExpenseForm}
      />
      <IncomeList 
        transactions={incomeTransactions}
        setTransactions={setIncomeTransactions}
        toggleForm={toggleIncomeForm}
        hideForm={hideIncomeForm}
      />
      </div>
      <AddIncomeForm
        incomeTransactions={incomeTransactions}
        setIncomeTransactions={setIncomeTransactions}
        hideForm={hideIncomeForm}
        toggleForm={toggleIncomeForm}
      />
      
      <AddExpenseForm
        expenseTransactions={expenseTransactions}
        setExpenseTransactions={setExpenseTransactions}
        hideForm={hideExpenseForm}
        toggleForm={toggleExpenseForm}
      />

      
    </div>
  );
};

export default App;