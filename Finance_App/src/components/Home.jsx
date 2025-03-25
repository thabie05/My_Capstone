import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import TotalAmount from "./TotalAmount";
import AddExpenseForm from "./AddExpenseForm";
import AddIncomeForm from "./AddIncomeForm";
import IncomeList from "./IncomeList";




const Home = () => {
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
    
    <div>
        <h1 className="text-4xl font-bold text-center">Expense Tracker</h1>
        <div className="flex gap-30 max-w-[1920px] mx-auto flex-wrap justify-center">
      <TotalAmount 
        incomeTransactions={incomeTransactions}
        expenseTransactions={expenseTransactions}
      />
      <div className="flex gap-3 justify-center flex-wrap">

        <div className="flex gap-30 justify-center flex-wrap">
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