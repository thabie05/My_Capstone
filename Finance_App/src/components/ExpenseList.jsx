import React from 'react'

const ExpenseList = (formData) => {
  return (
    <div>
        <div className="overflow-x-auto rounded-3xl shadow absolute left-335 right-30 top-95 max-w-4xl mx-auto w-lg">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formData.name}</td>
        
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formData.category}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(formData.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  -R{parseFloat(formData.amount).toFixed(2)}
                </td>
              </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseList;
