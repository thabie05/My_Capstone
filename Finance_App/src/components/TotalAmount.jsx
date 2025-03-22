

const TotalAmount = ({transactions}) => {

  const Total = transactions.reduce((sum, transaction) => {
      const Amount = parseFloat(transaction.amount)
      return sum + Amount
  }, 0)

  console.log(Total);
 
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6 w-sm text-center absolute top-50 right-20 left-20">
      <h3 className="text-2xl font-bold text-red-500 mb-80">
        Total Amount: R{Total}</h3>
    </div>
  )
}

export default TotalAmount
