import React from "react";
import Legend from "./Legend";
import Ads from "./Ads";



function RightCol() {


    return (
      <>
      <div className="w-full h-auto flex-grow flex-col justify-center items-center mx-auto">
        <Legend />
        <div className="w-9/10 mx-auto">
          <Ads />
        </div>
        
        
      </div>
        
       
      </>
    )
  }
  
  export default RightCol;
  