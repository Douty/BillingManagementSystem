import React, { useState } from 'react'

const BillSummaryCard = ({firstName, lastName, dueDate, paid, amountPaid , customerID, dateOfPayment, billId, kWh}) => {
  const [toggle,setToggle] = useState(false);
  
  return (
    <div>
        <div onClick={()=>{toggle ? setToggle(false) : setToggle(true);}} className={`flex ${paid ? "bg-pastelGreen" : "bg-pastelRed" } gap-3 w-[350px] p-2 justify-between cursor-pointer`}>

          <div className='flex-col'>
            <h1 className='font-bold'>{firstName}, {lastName}</h1>
            <h1 className='text-sm'>{dateOfPayment ? (new Date(dateOfPayment).toLocaleDateString()) : " Pending"}</h1>
          </div>

          <div className='text-right'>
            <h1 className='font-bold'>${amountPaid}</h1>
            <h1 className='text-sm '>{dueDate}</h1>
          </div>

        </div>

        <div className={`${toggle ? "show" : "hidden"} ${paid ? "bg-pastelGreen" : "bg-pastelRed" } p-2 gap-3`}>
          <h1><span className='font-bold'>Bill ID:</span> {billId}</h1>
          <h1><span className='font-bold'>Customer ID:</span> {customerID.toString()}</h1>
          <h1><span className='font-bold'>Balance Due:</span> ${amountPaid}</h1> 
          <h1><span className='font-bold'>Payment Due:</span> {dueDate}</h1>
          <h1><span className='font-bold'>Date of Payment: </span>{`${dateOfPayment ? (new Date(dateOfPayment).toLocaleDateString()) : " Pending"}`}</h1>
          <h1><span className='font-bold'>kWh:</span> {kWh}</h1>
        </div>
    </div>
  )
}

export default BillSummaryCard