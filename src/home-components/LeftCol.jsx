import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";


function LeftCol() {


    return (
      <>
      <div className="w-[23%] min-h-dvh flex-grow flex-col justify-center items-center mx-auto ">
        < Trivia />
        < MostRead /> 
        
      </div>
        
       
      </>
    )
  }
  
  export default LeftCol;
  