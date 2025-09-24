import { useState } from "react";
import { BiMessageError } from "react-icons/bi";
import { sendFeedback } from "../services/articleService";

function FeedbackButton({language, articleID}) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSubmit = async () => {
    if (feedback.trim().length === 0) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await sendFeedback(articleID, feedback);
      setSuccess(true);
      setFeedback(""); // clear textarea
      setIsOpen(false); // optionally close popup after submit
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 h-8 w-80 bg-[var(--color-bg-light)] border border-[var(--color-line-verylightgrey)] rounded-md flex justify-center"
      >
        <span className="flex items-center">
            <BiMessageError />
            <label className="mx-2 text-[var(--color-gs-black)] text-sm">
                {language === "zh-Hant" ? "意見回饋" : language === "zh-Hans" ? "意见回馈" : "Provide Feedback"}                                                
            </label>
        </span>
      </button>

      {isOpen && (
        <div className="relative right-0 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-4 space-y-4">
            <h2 className="text-base text-left">Help us improve</h2>
            <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="my-2 block w-full h-48 px-3 py-2 border border-[var(--color-line-verylightgrey)] rounded-md shadow-sm text-sm"
                placeholder="Please share your feedback about this summary (accuracy, design, tone, etc.)"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && <p className="text-[var(--color-text-grey)] text-xs">Feedback submitted!</p>}
            
            <button 
                onClick={handleSubmit}
                disabled={feedback.trim().length === 0}
                className={`w-full py-2 rounded-md text-white text-sm ${
                feedback.trim().length === 0
                    ? "bg-[var(--color-text-lightgrey)] cursor-not-allowed"
                    : "bg-[var(--color-dark-turquoise)] hover:bg-blue-500"
                }`}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
      )}
    </div>
  );
}
export default FeedbackButton;