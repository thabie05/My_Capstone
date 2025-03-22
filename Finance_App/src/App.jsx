import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import AddExpenseFrom from "./components/AddExpenseFrom";
import AddIncomeForm from "./components/AddIncomeForm";


const App= () => {
  // State management for form fields
const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const [hideForm, setHideForm] = useState(true)

  // State management for transactions list
  const [transactions, setTransactions] = useState([]);

  // Load transactions from local storage on component mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const toggleForm = () => {
    setHideForm(!hideForm)
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <AddExpenseFrom
        formData={formData}
        setFormData={setFormData}
        transactions={transactions}
        setTransactions={setTransactions}
        hideForm={hideForm}
        setHideForm={setHideForm}
        toggleForm={toggleForm}
      />

      <AddIncomeForm
        formData={formData}
        setFormData={setFormData}
        />

      <TotalAmount transactions={transactions} />

      <ExpenseList 
      transactions={transactions}
      toggleForm={toggleForm}
      setHideForm={setHideForm}
      hideForm={hideForm}
       />
    </div>
  );
};

export default App;