import React from "react";
import { useLanguage } from "../context/LanguageContext";

function OutletDistribution({ cPercent, pPercent, outletIcons }) {  
    const { language } = useLanguage();

    return (
        <div className="flex flex-col w-3/4 text-xs text-[var(--color-gs-black)]">
            <div className="flex justify-center w-full my-4 text-lg">
                Media outlets
            </div>
            <div className='relative flex w-full h-60 shadow-sm'>
                {/* Logos plotted inside padded area */}
                <div className="absolute inset-[10%] w-[80%] h-[80%]">
                    {outletIcons?.map((icon, idx) => (
                        <img
                            key={idx}
                            src={icon.logo}
                            alt={`Outlet ${idx}`}                        
                            className="absolute rounded-full shadow-md"
                            style={{
                                left: `${icon.rx * 90}%`,
                                top: `${icon.ry * 90}%`,
                                width: `${icon.size*4}rem`,
                                height: `${icon.size*4}rem`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}
                </div>
                
                { /* section for conservative */}
                <div
                className="flex items-center justify-center bg-[var(--color-bg-grey)] p-1"
                style={{ width:`${cPercent}%`}}
                />
                {/* section for progressive */}
                <div
                className="flex items-center justify-center bg-[var(--color-line-grey)] p-1"
                style={{ width:`${pPercent}%` }}
                />
            </div>
            {/* Labels under the graph */}
            <div className='w-full flex justify-between my-2'>
                    <div className="flex">
                        <div className="mr-1 h-4 w-4 rounded-full bg-[var(--color-bg-grey)]" />
                        <label>Conservative</label>
                    </div>
                    <div className="flex">
                        <label>Progressive</label>
                        <div className="ml-1 h-4 w-4 rounded-full bg-[var(--color-line-grey)]" />
                    </div>            
            </div>
        </div>
    );
}

export default OutletDistribution;
