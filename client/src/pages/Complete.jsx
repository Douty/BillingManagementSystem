import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/button";

const complete = () => {
  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-40 gap-6 ">
        <h1 className="text-4xl font-bold text-persian">Account created!</h1>
        <p>Click the login button to access your account</p>
        <button className="buttonStyle" onClick={handleLogin}>Login</button>
       
      </div>
    </div>
  );
};

export default complete;
