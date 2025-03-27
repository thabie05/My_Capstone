import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
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
          labels: [`Total Income R${totalIncome}`, `Total Expense R${totalExpense}`, `Total Saved R${totalSaved}`],
          datasets: [
            {
              label: 'R',
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
              hoverOffset: 4,
              borderWidth: 1,
            },
          ],
        };
        const data1 = {
          labels: expenseTransactions.map(transaction => transaction.name),
          datasets: [
            {
              label: 'Expense',
              data: expenseTransactions.map(transaction => parseFloat(transaction.amount)),
              backgroundColor: [
                '#222f40',
                '#167000',
                '#0747ff',
                '#5ffd56',
                '#17f199',
                '#565226',
                '#565656',
                '#534656',
                '#457656',
                '#800656',
                '#557898',
                '#289877',
              ],
              borderColor: [
                '#222f40',
                '#167000',
                '#0747ff',
                '#5ffd56',
                '#17f199',
                '#565226',]
              ,
              borderWidth: 1,
            },
          ],
        }

  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Overview</h1>
        <div className='flex  items-center wx-100 justify-center gap-100 mt-20 max-w-1200'>
          <div>
            <Doughnut className='w-100' data={data} />
          </div>
          <div>
            <Bar className='w-100 bg-[#000000bd] b' data={data1} />
          </div>
        </div>
      <p className='text-center'>length of incomeTransactions: {totalIncome}</p>
    </div>
  )
}

export default Overview;
