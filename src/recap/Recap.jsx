import React from "react";


function Recap() {
    const dailyRecap = [
        "North Korea fires a nuke at the moon",
        "Joe Biden summons an assault helicopter",
        "Half of Hong Kong suffers from Ligma",
        "Manchester United fires head coach Ruben Amorim",
        "Elon Musk enables hentai video generation function on Grok for X Premium users"
    ]


    return (
        <div className="w-2/3 mx-auto max-w-[1600px] py-8">
            <h1 className="text-3xl text-[var(--color-primary)]">News Recap</h1>

            <div className="flex flex-col gap-16 mt-8">
                <section>
                    <h2 className="text-xl font-semibold my-2">Daily</h2>
                    {dailyRecap.map((item, index) => (
                        <div className="flex items-center">
                            <span className="text-[var(--color-primary)] text-lg">{index+1}</span>
                            <label className="ml-4 text-base">{item}</label>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-xl font-semibold my-2">Weekly</h2>
                    {dailyRecap.map((item, index) => (
                        <div className="flex items-center">
                            <span className="text-[var(--color-primary)] text-lg">{index+1}</span>
                            <label className="ml-4 text-base">{item}</label>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-xl font-semibold my-2">Monthly</h2>
                    {dailyRecap.map((item, index) => (
                        <div className="flex items-center">
                            <span className="text-[var(--color-primary)] text-lg">{index+1}</span>
                            <label className="ml-4 text-base">{item}</label>
                        </div>
                    ))}
                </section>
            </div>
            
        </div>
    );

}

export default Recap;