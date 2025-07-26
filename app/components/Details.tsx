import React from "react";
import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
    const getColorClasses = () => {
        if (score > 69) {
            return {
                bg: "bg-emerald-500/20",
                text: "text-emerald-400",
                icon: "/assets/icons/check.svg"
            };
        } else if (score > 39) {
            return {
                bg: "bg-amber-500/20",
                text: "text-amber-400",
                icon: "/assets/icons/warning.svg"
            };
        } else {
            return {
                bg: "bg-rose-500/20",
                text: "text-rose-400",
                icon: "/assets/icons/warning.svg"
            };
        }
    };

    const colors = getColorClasses();

    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full",
            colors.bg
        )}>
            <img
                src={colors.icon}
                alt="score"
                className="w-4 h-4"
            />
            <span className={cn("text-sm font-medium", colors.text)}>
                {score}/100
            </span>
        </div>
    );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
                             tips,
                         }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
    return (
        <div className="mt-4 space-y-6">
            {/* Quick Tips Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tips.map((tip, index) => (
                    <div
                        key={`quick-${index}`}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg",
                            tip.type === "good"
                                ? "bg-emerald-900/30 border border-emerald-800/50"
                                : "bg-amber-900/30 border border-amber-800/50"
                        )}
                    >
                        <img
                            src={tip.type === "good"
                                ? "/assets/icons/check.svg"
                                : "/assets/icons/warning.svg"}
                            alt={tip.type}
                            className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-200">
                            {tip.tip}
                        </span>
                    </div>
                ))}
            </div>

            {/* Detailed Explanations */}
            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div
                        key={`detail-${index}`}
                        className={cn(
                            "p-4 rounded-xl border",
                            tip.type === "good"
                                ? "bg-emerald-900/10 border-emerald-800/30"
                                : "bg-amber-900/10 border-amber-800/30"
                        )}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={tip.type === "good"
                                    ? "/assets/icons/check.svg"
                                    : "/assets/icons/warning.svg"}
                                alt={tip.type}
                                className="w-5 h-5"
                            />
                            <h4 className={cn(
                                "font-semibold",
                                tip.type === "good"
                                    ? "text-emerald-300"
                                    : "text-amber-300"
                            )}>
                                {tip.tip}
                            </h4>
                        </div>
                        <p className="text-gray-300 text-sm pl-8">
                            {tip.explanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h2>

            <Accordion>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback.content.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback.structure.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback.skills.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;