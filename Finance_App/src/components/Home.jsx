import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";          // <-- add
import ExpenseList from "./ExpenseList";
import TotalAmount from "./TotalAmount";
import AddExpenseForm from "./AddExpenseForm";
import AddIncomeForm from "./AddIncomeForm";
import IncomeList from "./IncomeList";
import DateSelector from "./DateSelector";

const Home = () => {
  const { user } = useAuth();                              // <-- get current user
  const userEmail = user?.email;                            // unique identifier

  const [hideIncomeForm, setHideIncomeForm] = useState(true);
  const [hideExpenseForm, setHideExpenseForm] = useState(true);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleIncomeForm = () => setHideIncomeForm(!hideIncomeForm);
  const toggleExpenseForm = () => setHideExpenseForm(!hideExpenseForm);

  // Load user‑specific data from localStorage
  useEffect(() => {
    if (!userEmail) return;
    const storedIncome = localStorage.getItem(`moneyIn_${userEmail}`);
    const storedExpenses = localStorage.getItem(`moneyOut_${userEmail}`);
    if (storedIncome) setIncomeTransactions(JSON.parse(storedIncome));
    if (storedExpenses) setExpenseTransactions(JSON.parse(storedExpenses));
  }, [userEmail]);                                         // re‑run when user changes

  // Save helpers
  const saveIncome = (transactions) => {
    localStorage.setItem(`moneyIn_${userEmail}`, JSON.stringify(transactions));
  };

  const saveExpense = (transactions) => {
    localStorage.setItem(`moneyOut_${userEmail}`, JSON.stringify(transactions));
  };

  // Handlers for adding/removing
  const handleAddIncome = (newIncome) => {
    const updated = [...incomeTransactions, newIncome];
    setIncomeTransactions(updated);
    saveIncome(updated);
  };

  const handleAddExpense = (newExpense) => {
    const updated = [...expenseTransactions, newExpense];
    setExpenseTransactions(updated);
    saveExpense(updated);
  };

  const handleRemoveIncome = (index) => {
    const updated = incomeTransactions.filter((_, i) => i !== index);
    setIncomeTransactions(updated);
    saveIncome(updated);
  };

  const handleRemoveExpense = (index) => {
    const updated = expenseTransactions.filter((_, i) => i !== index);
    setExpenseTransactions(updated);
    saveExpense(updated);
  };

  const filterTransactionsByDate = (transactions) => {
    if (!selectedDate) return transactions;
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 text-white rounded-2xl bg-[#12182bab] shadow-lg mt-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/4 lg:flex-shrink-0 mb-6 lg:mb-0">
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
          <TotalAmount
            incomeTransactions={incomeTransactions}
            expenseTransactions={expenseTransactions}
            selectedDate={selectedDate}
          />
        </div>

        <div className="w-full lg:flex-grow">
          <div className="flex flex-wrap sm:flex-wrap 2xl:flex-nowrap gap-6 md:gap-8">
            <div className="w-full">
              <AddIncomeForm
                hideForm={hideIncomeForm}
                toggleForm={toggleIncomeForm}
                onAddIncome={handleAddIncome}               // <-- pass callback
              />
              <IncomeList
                transactions={filterTransactionsByDate(incomeTransactions)}
                onRemove={handleRemoveIncome}                // <-- already using callback
                toggleForm={toggleIncomeForm}
                hideForm={hideIncomeForm}
              />
            </div>
            <div className="w-full">
              <AddExpenseForm
                hideForm={hideExpenseForm}
                toggleForm={toggleExpenseForm}
                onAddExpense={handleAddExpense}              // <-- pass callback
              />
              <ExpenseList
                transactions={filterTransactionsByDate(expenseTransactions)}
                onRemove={handleRemoveExpense}                // <-- already using callback
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