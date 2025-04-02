import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';
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
          labels: [
            `Total Income R${totalIncome.toFixed(2)}`, 
            `Total Expense R${totalExpense.toFixed(2)}`, 
            `Total Saved R${totalSaved.toFixed(2)}`
          ],
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
    };

    // --- Chart Options (Common & Specific) ---
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Crucial for controlling height via container div
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#E5E7EB', // Tailwind gray-200
                    padding: 15,
                    font: { size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 4,
            }
        },
    };

    const doughnutOptions = {
        ...commonChartOptions,
        plugins: {
            ...commonChartOptions.plugins,
            title: {
                display: true,
                text: 'Income vs. Expense Breakdown',
                color: '#F9FAFB', // Tailwind gray-50
                font: { size: 16, weight: '600' },
                padding: { top: 10, bottom: 20 }
            }
        }
    };

    const barOptions = {
        ...commonChartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#9CA3AF' }, // Tailwind gray-400
                grid: { color: 'rgba(156, 163, 175, 0.2)' } // Tailwind gray-400 with alpha
            },
            x: {
                ticks: { color: '#D1D5DB' }, // Tailwind gray-300
                grid: { display: false }
            }
        },
        plugins: {
            ...commonChartOptions.plugins,
            title: {
                display: true,
                text: 'Expenses by Category',
                color: '#F9FAFB', // Tailwind gray-50
                font: { size: 16, weight: '600' },
                padding: { top: 10, bottom: 20 }
            }
        }
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-3xl font-bold text-center mb-8'>Financial Overview</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-[#000000bd] rounded-2xl p-6 shadow-xl'>
            <div className='h-64 md:h-80'>
              <Doughnut 
                data={data} 
                options={doughnutOptions}
              />
            </div>
          </div>
          <div className='bg-[#000000bd] rounded-2xl p-6 shadow-xl'>
            <div className='h-64 md:h-80'>
              <Bar 
                data={data1} 
                options={barOptions}
              />
            </div>
          </div>
        </div>
      <p className='text-center'></p>
    </div>
  )
}

export default Overview;
