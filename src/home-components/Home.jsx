import React from "react";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";
import MainCol from "./MainCol";

function Home() {


    return (
      <>
      <div className="flex w-[95dvw] justify-between items-start mx-auto ">
        < LeftCol />
        < MainCol />
        < RightCol />
      </div>
        
       
      </>
    )
  }
  
  export default Home;
  