// components/Overview.js
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Overview = () => {
  const { user } = useAuth();                     // <-- changed to user
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;                           // <-- changed

    const incomeQuery = query(
      collection(db, 'incomes'),
      where('userId', '==', user.uid)            // <-- changed
    );
    const unsubscribeIncome = onSnapshot(incomeQuery, (snapshot) => {
      const incomes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIncomeTransactions(incomes);
    });

    const expenseQuery = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid)            // <-- changed
    );
    const unsubscribeExpense = onSnapshot(expenseQuery, (snapshot) => {
      const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenseTransactions(expenses);
    });

    return () => {
      unsubscribeIncome();
      unsubscribeExpense();
    };
  }, [user]);       

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const totalSaved = totalIncome - totalExpense;

  const doughnutData = {
    labels: [`Total Expense R${totalExpense.toFixed(2)}`, `Total Saved R${totalSaved.toFixed(2)}`],
    datasets: [{
      data: [totalExpense, totalSaved],
      backgroundColor: ['#EF4444', '#10B981'],
      borderColor: ['#DC2626', '#059669'],
      borderWidth: 1
    }]
  };

  const expensesByCategory = expenseTransactions.reduce((acc, t) => {
    const cat = t.category;
    acc[cat] = (acc[cat] || 0) + parseFloat(t.amount);
    return acc;
  }, {});
  const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);

  const barData = {
    labels: sortedCategories.map(([cat]) => cat),
    datasets: [{
      label: 'Total Spent per Category',
      data: sortedCategories.map(([, amount]) => amount),
      backgroundColor: '#ef4444b3',
      borderColor: '#dc2626',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#E5E7EB' } },
      tooltip: { backgroundColor: 'rgba(0,0,0,0.8)' }
    },
    scales: {
      y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(156,163,175,0.2)' } },
      x: { ticks: { color: '#D1D5DB' }, grid: { display: false } }
    }
  };

  return (
    <div className="container bg-[#12182bab] rounded-2xl shadow-lg mx-auto my-15 px-4 py-8">
      <h1 className='text-3xl font-bold text-center mb-8'>Financial Overview</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 my-20 gap-8'>
        <div className='bg-[#000000bd] rounded-2xl p-6 shadow-xl h-80'>
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
        <div className='bg-[#000000bd] rounded-2xl p-6 shadow-xl h-80'>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;