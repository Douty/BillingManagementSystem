import React from "react";

const Card = ({ title, alt, image, disc }) => {
  return (
    <div className=" flex flex-col h-auto shadow-lg rounded-2xl bg-royal leading-relaxed m-5 max-w-[350px]">
      <img src={image} alt={alt} className="object-cover h-36 " />
      <div className="px-5 text-white">
        <h1 className="py-2 text-xl font-semibold">{title}</h1>
        <p className="py-1 text-md">{disc}</p>
        <a href="#" className="flex items-end justify-end font-bold py-2">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Card;
