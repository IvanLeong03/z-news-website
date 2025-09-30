import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";
import Ads from "./Ads";

function LeftCol() {
  return (
    <div className="w-full flex flex-col justify-start items-center mx-auto">
      < Trivia />
      < MostRead />   
      
          
    </div>               
  )
}
  
export default LeftCol;
  