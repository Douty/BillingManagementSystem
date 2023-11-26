import React from "react";
import { useNavigate } from "react-router-dom";
/* Component Imports */
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Footer from "../components/Footer";

/* End Of Component Imports */
import HeroVideo from "../assets/hero.webm";
import MovingPic from "../assets/moving.jpg";
import CommunityPic from "../assets/community.jpg";
import LightPic from "../assets/save.jpg";
import GreenEnergy from "../assets/greenEnergy.jpg";
import CallCenter from "../assets/callcenter.jpg";
import Employer from "../assets/employer.jpg";

const Home = () => {
  let navigate = useNavigate();

  const HandleRegister = () => {
    navigate("/register");
  };

  const HandleLogin = () => {
    navigate("/login");
  };

  return (
    <div  className="font-poppins">
      <NavBar />
      {/*Hero section*/}
      <div className="relative h-[55vh] md:h-[60vh] lg:h-[40vh]">
        <video
          src={HeroVideo}
          muted
          autoPlay
          loop
          className="absolute -z-10 brightness-50 w-full object-cover h-[50vh] md:h-[60vh] lg:h-[40vh]"
        />
        <div className="flex flex-col text-white text-center py-[10vh]">
          <h1 className="font-bold text-3xl lg:text-5xl">Breathe Easy.</h1>
          <p className=" p-2 lg:py-5 lg:text-xl">
            Join our Community as we are leading the next generation with green
            energy!
          </p>
          <div className="flex gap-5 py-8 justify-center">
            <button className="buttonStyle" onClick={HandleRegister}>Register</button>
            <button className="buttonStyle" onClick={HandleLogin}>Login</button>
            
          </div>
        </div>
      </div>
      {/* End of Hero Section*/}

      {/* Card section */}
      <div className="flex my-4 mx-[3vw] justify-center flex-wrap md:mx-[5vw] lg:mx-[12vw]">
        <Card
          image={MovingPic}
          title="Review Location Services"
          disc="Recently Moved? Moving out? or need a change of power? "
        />
        <Card
          image={CommunityPic}
          title="Report an Outage"
          disc="Experiencing an outage in your area? Report it here"
        />
        <Card
          image={LightPic}
          title="Energy Saving Tips"
          disc="Looking to save some energy? Read the latest top 10 energy saving tips"
        />
        <Card
          image={GreenEnergy}
          title="Green energy"
          disc="Learn more about th benefits of green energy"
        />
        <Card
          image={CallCenter}
          title="Get support center "
          disc="Need some help? Contact our support team!"
        />
        <Card
          image={Employer}
          title="Careers"
          disc="Become Part of Our Adventure: Join Our Team and Shape the Future Together!"
        />
      </div>
      {/*End of Card section */}
      <Footer />
    </div>
  );
};

export default Home;
