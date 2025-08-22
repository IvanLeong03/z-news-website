import React from "react";
import { useLanguage } from "../context/LanguageContext";

function OutletDistribution({ cPercent, pPercent }) {  
    const { language } = useLanguage();

    return (
        <div className="flex flex-col w-full text-xs text-[var(--color-gs-black)]">
            <div className="flex justify-center w-full mb-1">
                Media outlets
            </div>


            <div className='relative flex w-full h-32 shadow-sm'>
                <div
                className="flex items-center justify-center bg-[var(--color-bg-grey)] p-1"
                style={{ width:`${cPercent}%`}}
            >
                </div>
                <div
                className="flex items-center justify-center bg-[var(--color-secondary-3)] p-1"
                style={{ width:`${pPercent}%` }}
                >
                </div>
            </div>

        </div>
    );
}

export default OutletDistribution;
