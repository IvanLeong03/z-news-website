import React from "react";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";
import MainCol from "./MainCol";

function Home() {
    return (
      <div className="w-9/10 overflow-scroll mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-2">
        < LeftCol />
        < MainCol />
        < RightCol />
      </div>

    )
  }

  export default Home;
  