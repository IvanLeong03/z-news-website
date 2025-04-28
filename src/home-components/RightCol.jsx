import React from "react";
import Legend from "./Legend";
import Ads from "./Ads";



function RightCol() {


    return (
      <>
      <div className="w-[23%] min-h-dvh flex-grow flex-col justify-center items-center mx-auto ">
        <Legend />
        <Ads />
        
      </div>
        
       
      </>
    )
  }
  
  export default RightCol;
  