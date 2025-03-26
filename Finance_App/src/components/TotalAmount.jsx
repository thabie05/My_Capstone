
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


const TotalAmount = ({ incomeTransactions, expenseTransactions }) => {

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
    <div className=" totalAmount  ml-12 rounded-3xl shadow-lg mt-40 min-w-sm text-center p-10 gap-20 flex max-h-110 ">
      <div className="bg-linear-to-r from-[#434e55af] to-[#000000bd] absolute w-76 h-110 rounded-3xl bottom-76"></div>
      <div className="z-1 flex flex-col gap-20">
      <h3 className="text-2xl font-bold text-green-500">
        Total Income:<br/> R{totalIncome.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-red-500">
        Total Expense:<br/> R{totalExpense.toFixed(2)}
      </h3>
      <h3 className="text-2xl font-bold text-blue-300">
        Total Saved:<br/> R{totalSaved.toFixed(2)}
      </h3>
      
      
      </div>
      
      <Doughnut className='w-90 h-90 mx-auto' data={data} />
    </div>
  );
};

export default TotalAmount;