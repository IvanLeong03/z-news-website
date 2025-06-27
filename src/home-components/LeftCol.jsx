import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";


function LeftCol() {

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center mx-auto">
      < Trivia />
      < MostRead />         
    </div>               
  )
}
  
export default LeftCol;
  