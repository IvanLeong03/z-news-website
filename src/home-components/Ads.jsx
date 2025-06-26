import React from "react";
import { FaShoppingBag } from "react-icons/fa";

function Ads() {

    return (
        <section className="w-9/10 mx-auto border border-green-300 my-2 flex flex-col h-full justify-center items-center">
            <p className="text-xl">ADVERTISEMENT</p>
            <p className="text-xl">廣告</p>
            <FaShoppingBag size={32}/>
        </section>            
    )
}

export default Ads;