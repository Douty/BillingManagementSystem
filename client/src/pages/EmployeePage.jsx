import React, { useState } from 'react'
import BillSummaryCard from '../components/BillSummaryCard';
import NavBar from '../components/NavBar'

const EmployeePage = () => {
    const [query, setQuery] = useState("");

  return (
    <div>
        <NavBar />

        <div className='flex justify-center rounded-xl'>
            <input 
                placeholder='Search'
            />

        </div>

        
    </div>
  )
}

export default EmployeePage
