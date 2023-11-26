import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";


const Account = () => {
  const loc = useLocation();
  const customer = loc.state.customerDetails;
  const bill = loc.state.billDetails;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentDate, setCurrentDate] = useState(customer.simulatedTime);

  const [dueDate, setDueDate] = useState((bill.dueDate));
  const [amountOwed, setAmountOwed] = useState(bill.amountOwed);
  const [watts,setWatts] = useState(bill.wattUsage);
  const [warning,setWarning] = useState(false);
  const [saveNotification,setSaveNotification] = useState();

  

  
  
  const TimeOfDay = () => {
    const currentDate = new Date(); 
    const currentHour = currentDate.getHours();
  
    if (currentHour < 12) { 
      return "Morning";
    } else if (currentHour < 17) {
      return "Afternoon";
    } else if (currentHour < 21) {
      return "Evening";
    } else {
      return "Night";
    }
  };
  const Greeting = `Good ${TimeOfDay()} ${customer.firstName}!`;

  const handleSaveNotification = () =>{
    setSaveNotification(true);
    setTimeout(()=>{
      setSaveNotification(false);
    }, 4000);
  }

  const userUpdate = (e) => {
    e.preventDefault();
    
    const newUserInfo  = {};
  
    if (firstName){
      newUserInfo.firstName = firstName
    }
    if (lastName){
      newUserInfo.lastName = lastName
    }
    if (username){
      newUserInfo.username = username
    }
    if (phoneNumber){
      newUserInfo.phoneNumber = phoneNumber
    }
    if (email){
      newUserInfo.email = email
    }
    const userID = customer._id;
    axios.post("/api/updateUserInfo",{newUserInfo,userID});

    handleSaveNotification();

  } 
  
  //Simulates the days passing by
  const simulateDays = (daysPassing) => {
    if (isPaymentOverDue()){

      setWarning(true);

    } else {
        setCurrentDate(prevDate => new Date(new Date(prevDate).setDate(new Date(prevDate).getDate() + daysPassing)));
        console.log(dueDate < currentDate);
        for (let day = 0; day < daysPassing; day++){
          let kiloWattHours = Math.floor(Math.random() * (32 - 26) + 26);
          setWatts(watts => watts + kiloWattHours);
          setAmountOwed((currentAmount) => currentAmount + (kiloWattHours * 0.2));
        }
    }
  }
  
  const isPaymentOverDue = () =>{
    const overdue = new Date(dueDate);
    const simulatedTime = new Date(currentDate);
    
    if (overdue < simulatedTime){
      return true;
    } else {
      return false;
    }
  }

  const saveCurrentSimulation = () =>{
    const currentBill = {
      amountOwed: amountOwed,
      kiloWatts: watts,
      dueDate: dueDate,
    }
    
    const customerStatus = {
      simulatedDate: currentDate,
      firstName: customer.firstName,
      lastName: customer.lastName,
      id: customer._id,
    }

    return {currentBill, customerStatus}
    
  }
  const handleSaveSimulation = () =>{
    const {currentBill, customerStatus} = saveCurrentSimulation();
    const sessionData = {currentBill, customerStatus};
    
    axios.post('/api/simulationSave',sessionData);
    handleSaveNotification();
  }
  
  

  const handlePayBalance = () =>{
    const {currentBill, customerStatus} = saveCurrentSimulation();

    axios.post('/api/PayBalance',{currentBill, customerStatus});
    handleSaveNotification();
  }
  
  return (
    <div className="font-poppins ">
      <NavBar />
    
        <div>
            <div className="flex flex-col justify-center items-center p-5">
              <h1 className="text-green-blue font-bold  text-2xl md:text-3xl">{Greeting}</h1>
                {warning ? (
                  <div className="bg-pastelRed p-3 my-4 rounded-xl gap-2">
                    <h1 className="text-xl text-darkRed py-1">Warning</h1>
                    <p className="max-w-[400px]">Your last bill payment is overdue. Please make a payment to avoid disconnection of power.</p>
                  </div>
                  ) : null
                }

                {saveNotification ? (
                  <div className="bg-darkGreen p-3 my-4 rounded-xl gap-2">
                    <h1 className="text-xl  py-1">Success</h1>
                    <p className="max-w-[400px]">Sign out and log back in to see the changes!</p>
                </div>
                )  : null
                }
                
            </div>
            <div className="flex lg:justify-evenly">
              <div>
                <form className="flex flex-col gap-4 px-5 justify-center items-center" onSubmit={userUpdate}>
                  <div className="">
                    <h2 className="font-semiBold text-green-blue py-3  text-xl text-center">Edit Account details</h2>
                    <label>First name:</label>
                    <input
                      className="AccountInput border-b-2"
                      name="firstName"
                      placeholder={`${customer.firstName}`}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Last name:</label>
                    <input
                      className="AccountInput border-b-2"
                      name="LastName"
                      placeholder={customer.lastName}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Username:</label>
                    <input
                      className="AccountInput border-b-2"
                      name="userName"
                      value={username}
                      placeholder={customer.username}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Cell number:</label>
                    <input
                      className="AccountInput border-b-2"
                      name="PhoneNumber"
                      value={phoneNumber}
                      placeholder={customer.phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Email:</label>
                    <input
                      className="AccountInput border-b-2"
                      name="email"
                      value={email}
                      placeholder={customer.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  {firstName || lastName || username || phoneNumber || email ? (
                    <button className="buttonStyle my-2 w-[100px]">Submit</button>
                  ) : null}
                </form>
              
                <div className="flex flex-col gap-2 py-2 items-center">
                    <h1 className="text-xl pt-5 text-green-blue">Simulate Day Change</h1>
                    <p>{new Date(currentDate).toLocaleString()}</p>
                    <div className="flex gap-2 py-2 ">
                    
                      <button className="buttonStyle" onClick={()=>{simulateDays(1)}}>Add 1 day</button>
                    
                      <button className="buttonStyle" onClick={()=>{simulateDays(7)}}>Add 1 week</button>
                    
                      <button className="buttonStyle" onClick={()=>{handleSaveSimulation()}}>Save</button>

                    </div>
                </div>
                
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col h-auto shadow-lg rounded-2xl leading-relaxed m-5 max-w-[400px] lg:max-w-[500px] text-center gap-5 items-center">
                <h1 className="text-xl py-5 text-green-blue">View Current Invoice</h1>
                <h2 className="w-[150px]">Invoice due date: {new Date(dueDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                <h2 className="w-[250px]">Wattage Used : {watts} Watts</h2>
                <h2 className="w-[150px]">Amount Owed : ${amountOwed.toFixed(2)}</h2>
                <button className="buttonStyle my-2" onClick={()=>{handlePayBalance()}}>Pay Balance</button>
              </div>
            </div>
            
        </div>
      </div>            
    
    );
};

export default Account;
