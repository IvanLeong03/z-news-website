import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";


function LeftCol() {

  return (
    <div className="w-full h-auto flex flex-col flex-grow justify-center items-center mx-auto ">
      < Trivia />
      < MostRead />         
    </div>               
  )
}
  
export default LeftCol;
  