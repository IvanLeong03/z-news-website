import React from "react";
import Legend from "./Legend";
import Latest from "./Latest";
import Ads from "./Ads";

function RightCol() {
    return (
        <>
        <div className="w-full h-auto flex flex-col items-center mx-auto">
            <Legend />  
            <div>
                <Latest />     
            </div>
        </div>
        </>
    )
  }
  
  export default RightCol;
  