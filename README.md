# Finance App

A simple financial tracking application built with React to manage expenses and income with local storage persistence.

## Installation

1. **Prerequisites**
   - Node.js (v14+)
   - npm (v6+)


## Features

- Add expenses and income with name, amount, category, and date
- Separate tracking for income and expenses
- Local storage for data persistence
- Automatic total calculations
- Responsive UI with Tailwind CSS
- Toggleable form buttons
- Date picker for transactions
- Category tagging system

## Usage

**Adding Transactions**
1. Click the "+ Expense" button to add new expenses

2. Click the "+ Income" button to add new income

3. Fill in the form fields:

   - Name: Transaction description

   - Amount: Transaction value

   - Category: Transaction category (e.g., Food, Salary)

   - Date: Transaction date

4. Click "Add +" to save

**Viewing Transactions**
- Expenses appear in red with "-" prefix

- Income appears in green with "+" prefix

- Transactions sorted by date

- Totals displayed in separate cards

**Managing Data**
- All data persists automatically in local storage

- Close forms using the "Close" button

- Empty state shows "No transactions found"

 ## Components Structure
src/  
├── components/  
│   ├── AddExpenseForm.jsx  
│   ├── AddIncomeForm.jsx  
│   ├── ExpenseList.jsx  
│   ├── TotalAmount.jsx  
│   └── TotalIncome.jsx  
├── App.jsx  
└── main.jsx  

## Technologies Used
- React (v18+)

- Tailwind CSS

- Local Storage API

- HTML5 Date Input

- ES6 Features

- Functional Components

- React Hooks (useState, useEffect)
