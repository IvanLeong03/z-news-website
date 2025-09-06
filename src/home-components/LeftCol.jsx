import React from "react";
import Trivia from "./Trivia";
import MostRead from "./MostRead";
import Ads from "./Ads";


function LeftCol() {

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center mx-auto">
      < Trivia />
      < MostRead />   
      < Ads />      
    </div>               
  )
}
  
export default LeftCol;
  