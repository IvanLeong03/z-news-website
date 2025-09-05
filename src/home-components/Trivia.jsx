import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Trivia() {
    const { language } = useLanguage();
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
            <div className="relative w-9/10 mx-auto flex flex-col justify-start items-start pt-4 pb-8 border-b border-[var(--color-line-verylightgrey)] text-xs lg:text-base">
                <h3 className="font-bold text-xl my-1">{language === 'zh-Hant' ? "問答遊戲" : language === 'zh-Hans' ? "考考你" : "Trivia" }</h3>
                <p className="my-2 text-xs lg:text-sm">
                    {question}
                </p>
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={`w-full bg-[var(--color-bg-grey)] rounded-xl lg:rounded-2xl text-xs lg:text-sm my-2 ${
                            selectedAnswer !== null
                                ? index === selectedAnswer
                                    ? selectedAnswer === correctAnswerIndex
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    : ""
                                : ""
                        }`}
                    >
                        <div className="flex py-2">
                            <p className="mx-4">{String.fromCharCode(65 + index)}.</p>
                            <p className="text-left">{answer}</p>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}

export default Trivia;