import TotalAmount from './TotalAmount'
import { useEffect, useState } from 'react';

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

      

  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Overview</h1>
      <TotalAmount 
        incomeTransactions={incomeTransactions}
        expenseTransactions={expenseTransactions}
      />
      <p className='text-center'>length of incomeTransactions: {incomeTransactions.length}</p>
    </div>
  )
}

export default Overview;
