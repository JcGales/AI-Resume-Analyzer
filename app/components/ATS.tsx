import React from "react";

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Configs based on score
    const config = {
        gradientClass:
            score > 69
                ? "from-green-100"
                : score > 49
                    ? "from-yellow-100"
                    : "from-red-100",
        iconSrc:
            score > 69
                ? "/assets/icons/ats-good.svg"
                : score > 49
                    ? "/assets/icons/ats-warning.svg"
                    : "/assets/icons/ats-bad.svg",
        subtitle:
            score > 69
                ? "Great Job!"
                : score > 49
                    ? "Good Start"
                    : "Needs Improvement",
    };

    // Suggestion icon path helper
    const getSuggestionIcon = (type: "good" | "improve") =>
        type === "good"
            ? "/assets/icons/check.svg"
            : "/assets/icons/warning.svg";

    return (
        <div
            className={`bg-gradient-to-b ${config.gradientClass} to-white rounded-2xl shadow-md w-full p-6`}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={config.iconSrc}
                    alt="ATS Score Icon"
                    className="w-12 h-12"
                />
                <h2 className="text-2xl font-bold">
                    ATS Score - {score}/100
                </h2>
            </div>

            {/* Body */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                    {config.subtitle}
                </h3>
                <p className="text-gray-600 mb-4">
                    This score represents how well your resume is likely to
                    perform in Applicant Tracking Systems used by employers.
                </p>

                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3"
                        >
                            <img
                                src={getSuggestionIcon(suggestion.type)}
                                alt={
                                    suggestion.type === "good"
                                        ? "public/icons/check.svg"
                                        : "public/icons/warning.svg"
                                }
                                className="w-5 h-5 mt-1"
                            />
                            <p
                                className={
                                    suggestion.type === "good"
                                        ? "text-green-700"
                                        : "text-amber-700"
                                }
                            >
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <p className="text-gray-700 italic">
                Keep refining your resume to improve your chances of getting
                past ATS filters and into the hands of recruiters.
            </p>
        </div>
    );
};

export default ATS;
