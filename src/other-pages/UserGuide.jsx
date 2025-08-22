import React from "react";

function UserGuide() {
  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">User Guide</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">What are these metrics?</h2>
          <p className="mb-4">
            Our news site provides several metrics to help you better understand the content and tone of each article. Here’s a breakdown of what each metric means and how it’s calculated:
          </p>
        </section>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Conservative</h3>
          <p className="mb-2">
            <span className="italic">[Looking out of the car window]</span>
          </p>
          <p>
            The "Conservative" metric reflects the traditional or status quo perspective of the article. Articles with a higher Conservative score tend to focus on preserving existing values and institutions, while lower scores may indicate a more Progressive or reformist stance.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Progressive</h3>
          <p className="mb-2">
            <span className="italic">[Love is blooming]</span>
          </p>
          <p>
            The "Progressive" metric indicates how forward-thinking or change-oriented the article is. Articles with a higher Progressive score tend to advocate for new ideas, reforms, or social change, while lower scores may reflect more traditional or conservative viewpoints.
          </p>
        </section>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Sentiment</h3>
          <p>
            The sentiment score is calculated by analyzing the ratio of positive and negative words in the article. The score ranges from <b>-1</b> (most negative) to <b>1</b> (most positive). A higher score means the article uses more positive language, while a lower score indicates more negative or pessimistic language.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li><b>-1:</b> Most negative sentiment</li>
            <li><b>0:</b> Neutral sentiment</li>
            <li><b>1:</b> Most positive sentiment</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Subjectivity</h3>
          <p>
            The subjectivity score measures how subjective or objective the article is. It is calculated based on the proportion of adjectives and adverbs used in the text. The score ranges from <b>0</b> (most objective) to <b>1</b> (most subjective). Higher subjectivity means the article contains more personal opinions or emotional language, while lower subjectivity indicates a more factual, neutral tone.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li><b>0:</b> Most objective (fact-based)</li>
            <li><b>1:</b> Most subjective (opinion-based)</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Sources</h3>
          <p>
            Each article lists its sources, allowing you to verify the information and explore further reading. Reliable sourcing is key to trustworthy journalism.
          </p>
        </section>
        <div className="mt-10 text-center text-gray-500">
          <p>
            If you have questions or feedback about these metrics, please contact us or check back for updates as we continue to improve our analysis tools.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserGuide;