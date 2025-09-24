import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

function SummarySettingsDropdown({ language, summaryLanguage, setSummaryLanguage, tone, setTone }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 h-8 w-80 bg-[var(--color-gs-black)] text-[var(--color-gs-white)] rounded-md flex justify-center"
      >
        <span className="flex items-center">
          <IoSettingsOutline color="white" />
          <label className="mx-2 text-[var(--color-gs-white)] text-sm">
            {language === "zh-Hant"
              ? "總結設定"
              : language === "zh-Hans"
              ? "总结设定"
              : "Customise summary"}
          </label>
        </span>
      </button>

      {isOpen && (
        <div className="relative right-0 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-4 space-y-4">
          {/* Language Selector */}
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
                value={summaryLanguage}
                onChange={(e) => setSummaryLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                <option value="en">English</option>
                <option value="zh-Hant">Traditional Chinese</option>
                <option value="zh-Hans">Simplified Chinese</option>
            </select>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-sm font-medium mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="straightforward">Straightforward</option>
              <option value="nuanced">Nuanced</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
export default SummarySettingsDropdown;