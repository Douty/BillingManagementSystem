import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";


import SolarPanelBg from "../assets/panelsky.jpg";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [customWarningMessage , setCustomWarningMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setWarning(true);
      setCustomWarningMessage("No fields should be left blank");
    } else {

      const userData = {
        username:username,
        password:password,
      }

      axios.post("/api/login", {userData})
        .then((res) => {
          const serverData = res.data;
          if (serverData.success) {
            const customerDetails = serverData.customerDetails;
            const billDetails = serverData.billDetails;
            
            navigate(`/account/${username}`, { state: { customerDetails, billDetails } });
          } else {
            setWarning(true);
            setCustomWarningMessage("Either Username or Password is invaild");
          }
        })
        .catch((err) => {
          setWarning(true);
          setCustomWarningMessage("An error occurred during login.");
        });
      
    }
    
  };

  return (
    <div className="relative h-screen font-poppins">
    <NavBar />
    <img
      src={SolarPanelBg}
      className="object-cover brightness-50 h-full absolute w-full blur-none -z-10 "
    />
      <div className="flex justify-center">
        <div className="flex flex-col p-6 shadow-lg m-8 absolute bg-white -z-11 rounded-lg gap-4 lg:w-[400px]">
          <h1 className="text-3xl  text-green-blue">Login</h1>
          <p>Sign in to your account!</p>
          {warning ? (
              <h1 className="py-1 text-darkRed">{customWarningMessage}</h1>  
            ) : null
          }

            <div className="flex flex-col gap-5">
              <input
                name="username"
                value={username}
                className="border-b-2 border-persian"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter Username"
              />
              <input
                type="password"
                name="password"
                value={password}
                className="border-b-2 border-persian"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
              />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button className="buttonStyle " onClick={handleSubmit}>Customer Login</button>
              <button className="buttonStyle" onClick={()=>{navigate("/adminportal")}}>Employee Portal</button>
            </div>
              
            </div>
          </div>
    </div>
  );
};

export default Login;
