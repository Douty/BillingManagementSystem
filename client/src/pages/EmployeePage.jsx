import React, { useEffect, useState } from 'react'
import BillSummaryCard from '../components/BillSummaryCard';
import NavBar from '../components/NavBar'
import axios from "axios";

const EmployeePage = () => {
    const [query, setQuery] = useState("");
    const [doc, setDoc] = useState([]);
    const [currentPage, setCurrentPage] = useState();

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get("/api/fetchData");
        
        setDoc([...res.data.records, ...res.data.activeBills]);
      };
    
      fetchData();
    }, []);

    
    
    
    

  return (
    <div>
        <NavBar />

        <div className='flex justify-center rounded-xl gap-2'>
            <input
              className='border-solid border-2 px-2'
              placeholder='Search'
            />
            <button className='bg-green-blue p-1'>search</button>
        </div>
        

        <div className='flex flex-col items-center gap-2 py-4'>
          
          {doc.map((data) =>(
            
            <BillSummaryCard 
              key={data._id}
              billId={data._id}
              firstName={data.firstName}
              lastName={data.lastName}
              dueDate={new Date(data.dueDate).toLocaleDateString()}
              amountPaid={(data.amountOwed).toFixed(2)}
              paid={data.isPaid}
              customerID={data.customerID}
              dateOfPayment={data.DateOfPayment}
              kWh={data.wattUsage}
              
            />
          ))}
        </div>
        

        
    </div>
  )
}

export default EmployeePage
