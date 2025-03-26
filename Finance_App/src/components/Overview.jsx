import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);




const Overview = () => {
 
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);

    
       // Load transactions from local storage on component mount
       useEffect(() => {
        const storedIncome = localStorage.getItem("moneyIn");
        const storedExpenses = localStorage.getItem("moneyOut");
        
        if (storedIncome) setIncomeTransactions(JSON.parse(storedIncome));
        if (storedExpenses) setExpenseTransactions(JSON.parse(storedExpenses));
      }, []);

      const totalIncome = incomeTransactions.reduce((sum, transaction) => {
        return sum + (parseFloat(transaction.amount) || 0);
      }, 0);
    
      const totalExpense = expenseTransactions.reduce((sum, transaction) => {
        return sum + (parseFloat(transaction.amount) || 0);
      }, 0);
    
      const totalSaved = totalIncome - totalExpense;
      
        const data = {
          labels: ['Total Income', 'Total Expense', 'Total Saved'],
          datasets: [
            {
              label: '# of Votes',
              data: [totalIncome, totalExpense, totalSaved],
              backgroundColor: [
                '#00ff40',
                '#ff0000',
                '#0000ff',
              ],
              borderColor: [
                '#00ff40',
                '#ff0000',
                '#0000ff',
              ],
              borderWidth: 1,
            },
          ],
        };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Overview</h1>
      <Doughnut className='w-90 h-90 mx-auto' data={data} />
      <p className='text-center'>length of incomeTransactions: {totalIncome}</p>
    </div>
  )
}

export default Overview;
