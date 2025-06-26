import React from "react";
import { FaShoppingBag } from "react-icons/fa";

function Ads() {

    return (
        <section className="w-9/10 mx-auto bg-[var(--color-light-turquoise)]  my-2 gap-4 flex flex-col h-full justify-evenly items-center">
            <p className="text-xl">ADVERTISEMENT</p>
            <p className="text-xl">廣告</p>
            <FaShoppingBag size={32}/>
        </section>            
    )
}

export default Ads;