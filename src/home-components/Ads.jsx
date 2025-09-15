import React from "react";
import { FaShoppingBag } from "react-icons/fa";

function Ads() {

    return (
        <section className="bg-linear-to-t from-amber-200 to-amber-700 my-2 flex flex-col h-full justify-evenly items-center">
            <p className="text-xl">ADVERTISEMENT</p>
            <p className="text-xl">廣告</p>
            <FaShoppingBag size={32}/>
        </section>            
    )
}

export default Ads;