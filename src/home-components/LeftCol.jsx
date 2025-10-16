import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";

function LeftCol() {
  return (
    <div className="w-full flex flex-col items-center mx-auto">
      < MostRead />       
      < Trivia /> 
    </div>               
  )
}
  
export default LeftCol;
  