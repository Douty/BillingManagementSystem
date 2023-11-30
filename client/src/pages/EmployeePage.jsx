import React, { useState } from 'react'
import BillSummaryCard from '../components/BillSummaryCard';
import NavBar from '../components/NavBar'

const EmployeePage = () => {
    const [query, setQuery] = useState("");
  

  return (
    <div>
        <NavBar />

        <div className='flex flex-col items-center rounded-xl'>
            <input 
              placeholder='Search'
            />
        </div>
        

        <div className='flex flex-col items-center gap-2 py-4'>
          <BillSummaryCard 
            firstName="John" 
            lastName="Doe" 
            dueDate="December 24, 2023"
            amountPaid = "$246"
          />
          <BillSummaryCard 
            firstName="Alex" 
            lastName="Dawn" 
            dueDate="March, 23,2023" 
            amountPaid = "$546"
            paid={true} 
          />
        </div>
        

        
    </div>
  )
}

export default EmployeePage
