import React from "react";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";
import MainCol from "./MainCol";

function Home() {
    return (
        <div className="w-4/5 max-w-[2048px] overflow-scroll mx-auto grid grid-cols-[1fr_3fr_1fr]">
            <div className="min-w-0">< LeftCol /></div>
            <div className="min-w-0">< MainCol /></div>
            <div className="min-w-0">< RightCol /></div>
        </div>
    )
}

export default Home;
  