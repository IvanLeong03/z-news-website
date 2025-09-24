import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function TimelineScroller({ events }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden px-4 py-6">

      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        <FaArrowRight />
      </button>

      {/* Timeline Line + Dots */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-8 py-4 relative"
        style={{ maxWidth: "100%" }}
      >
        {events.map((event, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full mb-2" />
            <p className="text-xs text-gray-500">{event.date}</p>
            <p className="text-sm text-center">{event.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TimelineScroller;
