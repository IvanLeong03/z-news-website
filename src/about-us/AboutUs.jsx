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
            // Opacity from 0.1 to 1.0
            const newOpacity = 0.1 + scrollFraction * 0.8;
            setOpacity(Math.min(1, Math.max(0.3, newOpacity)));
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="flex-col w-4/5 mx-auto justify-center items-center text-center">            
            <video
                src="/src/assets/aboutUsVideo.mp4"
                className="w-full mx-auto shadow-lg"
                autoPlay
                muted
                loop
            />

            <div
                className="bg-[var(--color-light-turquoise)] rounded-xl text-lg -mt-24 mb-8 px-2 pt-20"
                style={{ opacity, transition: "opacity 0.3s" }}
            >    
                <p className="text-left my-8 w-3/4 mx-auto">
                    We are Zone News, a platform that aggregates news from various sources and evaluates the bias and sentiment of different media outlets.
                    Our mission is to deliver accurate and timely information to our audience, empowering them to stay informed about the latest events in the Hong Kong and China region. 
                </p>
                <p className="text-left my-8 w-3/4 mx-auto">
                    At the same time, users should be aware of the potential biases present in the news they consume.
                    We strive to create a user-friendly experience that allows users to easily navigate through different topics and sources, ensuring they have access to the news that matters most to them.  
                </p>    
                <p className="text-left mt-8 w-3/4 mx-auto">
                    Our other flagship product, Zimuth Terminal, is an AI-powered Media Monitoring assistant that was designed for communication
                    firms. To learn more, please visit <a href="https://zimuth.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">zimuth.ai</a>.
                </p>    

                <Carousel />                               
            </div>     
                             
        </main>
    )


};

export default AboutUs