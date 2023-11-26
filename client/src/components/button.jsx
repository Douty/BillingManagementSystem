import React from "react";
import { useNavigate } from "react-router-dom";
const Button = ({ title, destination, post }) => {
  let navigate = useNavigate();

  const transferPage = () => {
    navigate(destination);
  };

  return (
    <button
      onClick={transferPage}
      className="w-[150px] p-3 bg-green-blue text-center rounded-2xl block text-white"
    >
      {" "}
      {title}
    </button>
  );
};

export default Button;
