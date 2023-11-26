import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import WindMillBg from "../assets/windmill.jpg";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [customWarningMessage , setCustomWarningMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormData ={
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    }
   
    try {
      if (!firstName || !lastName || !username || !password) {
        setWarning(true);
        setCustomWarningMessage("No fields should be left blank");
      } else {
        axios.post("/api/registrationAttempt",{FormData})
          .then((res) => {
            const serverData = res.data;
            if (serverData.success) {
              navigate("/complete");
            } else {
              setWarning(true);
              setCustomWarningMessage("Username is already taken");
            }
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      }
    } catch (err) {
      if (err) throw err;
    }
  };
  return (
    <div className="relative h-screen font-poppins">
      <NavBar />
      <img
        src={WindMillBg}
        className="object-cover brightness-50 h-full absolute w-full blur-none -z-10 "
      />
      <div className="flex justify-center">
        <div className="flex flex-col p-6 shadow-lg m-8 absolute bg-white -z-11 rounded-lg">
          <h1 className="text-3xl py-3 text-green-blue">Lets Get Started!</h1>
          <p>Enter in your details below to create an Account</p>
          {warning ? (
              <h1 className="py-1 text-darkRed">{customWarningMessage}</h1>  
            ) : null
          }
          
          <div className="flex flex-col gap-8 py-5 ">
              <input
                value={firstName}
                className="border-b-2 "
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter your first name"
              />
              <input
                value={lastName}
                className="border-b-2"
                name="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Enter your last name"
              />

              <input
                value={username}
                className="border-b-2"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter your username"
              />
              <input
                type="password"
                value={password}
                className="border-b-2"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
              />
              <button className="buttonStyle " onClick={(e)=>{handleSubmit(e)}}>Submit</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Register;
