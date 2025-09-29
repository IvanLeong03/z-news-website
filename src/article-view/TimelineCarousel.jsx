import React, { useState, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function TimelineCarousel({ events, visible = 5, itemWidth = 200, gap = 24 }) {
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, events.length - visible);
  const step = itemWidth + gap;

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const translateX = useMemo(() => -(index * step), [index, step]);

  return (
    <div className="relative w-full min-w-0 py-8">
      {/* Viewport */}
      <div className="relative w-full overflow-hidden px-4">
        {/* Track */}
        <div
          className="relative flex"
          style={{
            width: events.length * itemWidth + (events.length - 1) * gap,
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: "transform 300ms ease",
          }}
        >
          {/* Line spans the whole track */}
          <div className="absolute top-10 left-0 right-0 h-[2px] bg-[var(--color-primary)] z-10" />

          {events.map((event, i) => (
            <div
              key={i}
              className="relative shrink-0 text-center rounded px-3 py-6"
              style={{ width: itemWidth }}
            >
              {/* Dot aligned with line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 w-4 h-4 bg-[var(--color-primary)] rounded-full border-2 border-white z-0" />
              {/* Date */}
              <p className="mt-12 text-xs text-[var(--color-text-lightgrey)]">{event.date}</p>
              {/* Description */}
              <p className="text-sm mt-2">{event.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() => setIndex((i) => Math.max(0, i - visible))}
          disabled={!canPrev}
          className={`absolute -left-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow
            ${!canPrev ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(maxIndex, i + visible))}
          disabled={!canNext}
          className={`absolute -right-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow
            ${!canNext ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default TimelineCarousel