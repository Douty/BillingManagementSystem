import React, { useState } from 'react'

const BillSummaryCard = ({firstName, lastName, dueDate, paid,amountPaid}) => {
  const [toggle,setToggle] = useState(false);
  return (
    <div>
        <div onClick={()=>{toggle ? setToggle(false) : setToggle(true);}} className={`flex ${paid ? "bg-pastelGreen" : "bg-pastelRed" } gap-3 w-[350px] p-2 justify-between`}>

          <div className='flex-col'>
            <h1 className='font-bold'>{firstName}, {lastName}</h1>
            <h1 className='text-sm'>{dueDate}</h1>
          </div>

          <div className='text-right'>
            <h1>{amountPaid}</h1>
            <h1 className='text-sm '>{dueDate}</h1>
          </div>

        </div>

        <div className={`${toggle ? "show" : "hidden"} ${paid ? "bg-pastelGreen" : "bg-pastelRed" } p-2`}>
          <h1>hi</h1>
        </div>
    </div>
  )
}

export default BillSummaryCard