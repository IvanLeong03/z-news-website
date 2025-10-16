import React from "react";
import { useLanguage } from "../context/LanguageContext";

function OutletDistribution({ cPercent, pPercent, cIcons, pIcons }) {  
    const { language } = useLanguage();

    return (
        <div className="flex flex-col w-full text-sm text-[var(--color-gs-black)]">
            <div className="flex justify-center w-full mt-4 mb-8 text-xl">
                {language === 'zh-Hant' ? '媒體分佈' : language === 'zh-Hans' ? '媒体分布' : 'Media Distribution'}
            </div>
            <div className='relative flex h-48 shadow-sm'>
                {/* Logos plotted inside padded area */}
                {/* conservative icons */}
                <div className="absolute inset-x-[5%] w-[90%] inset-y-[10%] h-[80%]">
                    {cIcons.map((icon, idx) => (
                        <img
                            key={idx}
                            src={icon.logo}
                            alt={`Outlet ${idx}`}                        
                            className="absolute rounded-full shadow-md"
                            style={{
                                left: `${icon.rx * 100}%`,
                                top: `${icon.ry * 100}%`,
                                width: `${icon.size*4}rem`,
                                height: `${icon.size*4}rem`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}

                    {pIcons.map((icon, idx) => (
                        <img
                            key={idx}
                            src={icon.logo}
                            alt={`Outlet ${idx}`}                        
                            className="absolute rounded-full shadow-md"
                            style={{
                                left: `${icon.rx * 100}%`,
                                top: `${icon.ry * 100}%`,
                                width: `${icon.size*4}rem`,
                                height: `${icon.size*4}rem`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}
                </div>
                
                { /* section for conservative */}
                <div
                className="flex items-center justify-center bg-[var(--color-bg-grey)] rounded-l-xl"
                style={{ width:`${cPercent}%`}}
                />
                {/* section for progressive */}
                <div
                className="flex items-center justify-center bg-[var(--color-line-grey)] rounded-r-xl"
                style={{ width:`${pPercent}%` }}
                />
            </div>
            {/* Labels under the graph */}
            <div className='w-full flex justify-between my-2'>
                <div className="flex">
                    <div className="mr-1 h-4 w-4 rounded-full bg-[var(--color-bg-grey)]" />
                    <label>
                        {language === "zh-Hant" ? "保守" : language === "zh-Hans" ? "保守" : "Conservative"} ({cPercent}%)
                    </label>
                </div>
                <div className="flex">
                    <label>
                        {language === "zh-Hant" ? "進步" : language === "zh-Hans" ? "进步" : "Progressive"} ({pPercent}%)
                    </label>
                    <div className="ml-1 h-4 w-4 rounded-full bg-[var(--color-line-grey)]" />
                </div>            
            </div>
        </div>
    );
}

export default OutletDistribution;
