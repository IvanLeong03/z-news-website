import React, { useState } from "react";


function Trivia() {

    const question="I oversee trade negotiations while trying not to start a full-blown international incident, and spend my evenings writing letters in flowery English that somehow still offend everyone. My side hustle? Accidentally shaping the future of Hong Kong by signing treaties that definitely needed more fine print. Who am I?";
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const correctAnswerIndex = 1; // Index of the correct answer

    const answers = [
        "Charles Elliot",
        "Sir Henry Pottinger",
        "Li Hongzhang",
        "Jardine Matheson"
    ];

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
    };

    return (
        <>
            <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto px-2 pt-2 pb-8 border-b-2 border-[rgba(37,37,37,0.75)]">
                <h3 className="font-bold my-1">Trivia</h3>
                <p className="mb-4 text-sm">
                    {question}
                </p>

                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={`bg-[theme(--color-bg-grey)] rounded-2xl px-4 my-2 ${
                            selectedAnswer !== null
                                ? index === correctAnswerIndex
                                    ? "bg-green-500"
                                    : index === selectedAnswer
                                    ? "bg-red-500"
                                    : ""
                                : ""
                        }`}
                    >
                        <div className="flex justify-start py-2">
                            <p className="mr-4">{String.fromCharCode(65 + index)}.</p>
                            <p className="text-left">{answer}</p>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}

export default Trivia;