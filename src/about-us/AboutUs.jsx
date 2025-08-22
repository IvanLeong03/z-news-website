import React from "react";
import Carousel from "./Carousel"; // Assuming you have a Carousel component

function AboutUs() {
    const [opacity, setOpacity] = React.useState(0.2);

    React.useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Prevent division by zero
            const scrollFraction = docHeight > 0 ? scrollTop / docHeight : 0;
            // Opacity from 0.5 to 1.0
            const newOpacity = 0.5 + scrollFraction * 0.8;
            setOpacity(Math.min(1, Math.max(0.5, newOpacity)));
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="flex-col w-full mx-auto justify-center items-center text-center">            
            <video
                src="/src/assets/aboutUsVideo.mp4"
                className="w-full mx-auto shadow-lg"
                autoPlay
                muted
                loop
            />

            <div
                className="bg-[var(--color-light-turquoise)] rounded-xl text-lg -mt-12 px-2 pt-20 text-[var(--color-gs-black)]"
                style={{ opacity, transition: "opacity 0.3s" }}
            >    
                <p className="text-left my-8 w-2/3 mx-auto">
                    Zone News is your comprehensive source for the latest news from around the world. We provide balanced,
                    accurate and timely reporting on politics, technology, sport and more.
                </p>
                <p className="text-left my-8 w-2/3 mx-auto">
                    Our mission is to keep you informed with quality journalism and diverse persepctives on the stories that matter most.
                </p>    
                <p className="text-left text-sm mt-16 mb-8 w-2/3 mx-auto">
                    Our other flagship product, Zimuth Terminal, is an AI-powered Media Monitoring assistant that was designed for communication
                    firms. To learn more, please visit <a href="https://zimuth.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">zimuth.ai</a>.
                </p>    
                <Carousel />                               
            </div>     
                             
        </main>
    )


};

export default AboutUs