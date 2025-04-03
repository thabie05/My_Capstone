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
            `Total Expense R${totalExpense.toFixed(2)}`, 
            `Total Saved R${totalSaved.toFixed(2)}`
          ],
          datasets: [
            {
              label: 'R',
              data: [ totalExpense, totalSaved],
              backgroundColor: [
                '#EF4444',
                '#10B981',
              ],
              borderColor: [
                '#DC2626',
                '#059669',
              ],
              hoverOffset: 4,
              borderWidth: 1,
            },
          ],
        };
        const expensesByCategory = expenseTransactions.reduce((acc, transaction) => {
          const category = transaction.category;
          acc[category] = (acc[category] || 0) + parseFloat(transaction.amount);
          return acc;
        }, {});
        const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
        const data1 = {
          labels: sortedCategories.map(([category]) => category),
          datasets: [
            {
              label: 'Total Spent per Category',
              data: sortedCategories.map(([, amount]) => amount),
              backgroundColor: [
                    '#ef4444b3',   
                    '#f97316b3',  
                    '#eab308b3',   
                    '#84cc16b3', 
                    '#22c55eb3',   
                    '#10b981b3',  
                    '#14b8a6b3',  
                    '#3b82f6b3',  
                    '#8b5cf6b3',  
                    '#d946efb3',
                ],
                borderColor: [ 
                  '#dc2626',
                  '#f97316',
                  '#ca8a04',
                  '#65a30d',
                  '#16a34a',
                  '#059669',
                  '#0f766e',
                  '#2563eb',
                  '#7c3aed',
                  '#c026d3',
                ]
              ,
              borderWidth: 1,
            },
        ],
    };

    // --- Chart Options (Common & Specific) ---
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#E5E7EB',
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
                text: `Total Income R${totalIncome.toFixed(2)}`, 
                color: '#F9FAFB',
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
                ticks: { color: '#9CA3AF' },
                grid: { color: 'rgba(156, 163, 175, 0.2)' } 
            },
            x: {
                ticks: { color: '#D1D5DB' },
                grid: { display: false }
            }
        },
        plugins: {
            ...commonChartOptions.plugins,
            title: {
                display: true,
                text: 'Expenses by Category',
                color: '#F9FAFB',
                font: { size: 16, weight: '600' },
                padding: { top: 10, bottom: 20 }
            }
        }
    };

  return (
    <div className="container bg-[#12182bab] rounded-2xl shadow-lg mx-auto my-15 px-4 py-8">
      <h1 className='text-3xl font-bold text-center mb-8'>Financial Overview</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 my-20 gap-8'>
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
