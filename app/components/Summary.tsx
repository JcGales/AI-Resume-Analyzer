import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 last:border-0">
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-gray-200">{title}</h3>
                <ScoreBadge score={score} />
            </div>
            <div className="text-lg font-medium">
                <span className={
                    score > 70 ? 'text-emerald-400' :
                        score > 49 ? 'text-amber-400' :
                            'text-rose-400'
                }>
                    {score}
                </span>
                <span className="text-gray-400">/100</span>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
            {/* Header with Score Gauge */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b border-gray-700/50">
                <div className="relative w-32 h-32">
                    <ScoreGauge score={feedback.overallScore} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                            {feedback.overallScore}
                        </span>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Your Resume Score
                    </h2>
                    <p className="text-gray-300">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="divide-y divide-gray-700/50">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>

            {/* Additional Feedback */}
            {feedback.summary && (
                <div className="p-6 bg-gray-800/30 border-t border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">
                        Overall Feedback
                    </h3>
                    <p className="text-gray-300">
                        {feedback.summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Summary;