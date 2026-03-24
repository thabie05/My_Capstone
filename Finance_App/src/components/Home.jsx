// components/Home.js
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";
import ExpenseList from "./ExpenseList";
import TotalAmount from "./TotalAmount";
import AddExpenseForm from "./AddExpenseForm";
import AddIncomeForm from "./AddIncomeForm";
import IncomeList from "./IncomeList";
import DateSelector from "./DateSelector";

const Home = () => {
  const { user } = useAuth();                     // <-- get user
  const [hideIncomeForm, setHideIncomeForm] = useState(true);
  const [hideExpenseForm, setHideExpenseForm] = useState(true);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleIncomeForm = () => setHideIncomeForm(!hideIncomeForm);
  const toggleExpenseForm = () => setHideExpenseForm(!hideExpenseForm);

  // Set up real-time listeners for income and expenses
  useEffect(() => {
    if (!user) return;   // <-- changed

    // Income listener
    const incomeQuery = query(
      collection(db, 'incomes'),
      where('userId', '==', user.uid)   // <-- changed
    );
    const unsubscribeIncome = onSnapshot(incomeQuery, (snapshot) => {
      const incomes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncomeTransactions(incomes);
    });

    // Expense listener
    const expenseQuery = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid)   // <-- changed
    );
    const unsubscribeExpense = onSnapshot(expenseQuery, (snapshot) => {
      const expenses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenseTransactions(expenses);
    });

    return () => {
      unsubscribeIncome();
      unsubscribeExpense();
    };
  }, [user]);   // <-- changed

  // Add income
  const handleAddIncome = async (newIncome) => {
    try {
      await addDoc(collection(db, 'incomes'), {
        ...newIncome,
        userId: user.uid,                // <-- changed
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding income: ", error);
    }
  };

  // Add expense
  const handleAddExpense = async (newExpense) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...newExpense,
        userId: user.uid,                // <-- changed
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  // Remove income
  const handleRemoveIncome = async (id) => {
    try {
      await deleteDoc(doc(db, 'incomes', id));
    } catch (error) {
      console.error("Error removing income: ", error);
    }
  };

  // Remove expense
  const handleRemoveExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error("Error removing expense: ", error);
    }
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
                onAddIncome={handleAddIncome}
              />
              <IncomeList
                transactions={filterTransactionsByDate(incomeTransactions)}
                onRemove={handleRemoveIncome}
                toggleForm={toggleIncomeForm}
                hideForm={hideIncomeForm}
              />
            </div>
            <div className="w-full">
              <AddExpenseForm
                hideForm={hideExpenseForm}
                toggleForm={toggleExpenseForm}
                onAddExpense={handleAddExpense}
              />
              <ExpenseList
                transactions={filterTransactionsByDate(expenseTransactions)}
                onRemove={handleRemoveExpense}
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