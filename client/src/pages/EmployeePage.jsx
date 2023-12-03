import React, { useEffect, useState } from 'react'
import BillSummaryCard from '../components/BillSummaryCard';
import NavBar from '../components/NavBar'
import axios from "axios";

const EmployeePage = () => {
    const [query, setQuery] = useState("");
    const [catagory, setCatagory] = useState("");
    const [catagoryName, setCatagoryName] = useState("");
    const [doc, setDoc] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [toggle, setToggle] = useState(false);
    

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get("/api/fetchData");
        
        setDoc([...res.data.records, ...res.data.activeBills]);
      };
    
      fetchData();
    }, []);


    const handleQuery = async () =>{
      const res = await axios.post("/api/docSearch",{field:catagory, query: query});

      setSearchResult([...res.data.records, ...res.data.activeBills]);
    }

    
    
    
    

  return (
    <div className='m-4'>
        <NavBar />
          <div>
          <div className='flex flex-wrap justify-center gap-3'>
            <div>
              <button onClick={() => {toggle ? setToggle(false) : setToggle(true); console.log(toggle) }} className='p-2 w-[130px] bg-grey'>{catagoryName ? catagoryName : "Filter"}</button>
              <div className={`${toggle ? "show" : "hidden"} flex flex-col gap-3 py-3 bg-grey`}>
                <button onClick={() => {setCatagory("firstName"); setCatagoryName("First name"); setToggle(false)}}>First name</button>
                <button onClick={() => {setCatagory("lastName"); setCatagoryName("Last name"); setToggle(false)}}>Last name</button>
                <button onClick={() => {setCatagory("customerID"); setCatagoryName("Customer ID"); setToggle(false)}}>Customer ID</button>
                <button onClick={() => {setCatagory("_id"); setCatagoryName("Bill ID"); setToggle(false)}}>Bill ID</button>
                <button onClick={() => {setCatagory("firstName"); setCatagoryName("Bill amount"); setToggle(false)}}>Bill amount</button>
              </div> 
            </div>

            
            <div>
              <input
                className='border-solid border-2 p-2 lg:w-[250px]'
                placeholder='Search'
                value={query}
                onChange={(e)=>{setQuery(e.target.value)}}
              />
              <button className='bg-white border-2 p-2 mx-3' onClick={()=>{handleQuery()}}>search</button>
            </div>

          </div>  
            
        
        

        <div className='flex flex-col items-center gap-2 py-4'>
          {query ?(searchResult.map((data) =>(
            
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
              )
            ))
            : (doc.map((data) =>(
            
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
            )
          ))}
          
        </div>
        

        
      </div>
    </div>
  )
}

export default EmployeePage
