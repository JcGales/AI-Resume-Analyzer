import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();

        return () => {
            if (resumeUrl) URL.revokeObjectURL(resumeUrl);
        };
    }, [imagePath]);

    return (
        <div className="w-full h-full p-2 group"> {/* Added group for hover effects */}
            <Link
                to={`/resume/${id}`}
                className="flex flex-col h-full bg-gray-900 rounded-xl border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300 overflow-hidden"
            >
                {/* Card Header */}
                <div className="p-4 flex justify-between items-start border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <div className="flex flex-col gap-1 pr-2 overflow-hidden">
                        {companyName && (
                            <h2 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                {companyName}
                            </h2>
                        )}
                        {jobTitle && (
                            <h3 className="text-sm text-gray-400 truncate group-hover:text-gray-300 transition-colors">
                                {jobTitle}
                            </h3>
                        )}
                        {!companyName && !jobTitle && (
                            <h2 className="text-lg font-bold text-white">
                                Resume
                            </h2>
                        )}
                    </div>
                    <div className="flex-shrink-0">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>

                {/* Resume Preview */}
                {resumeUrl && (
                    <div className="flex-grow flex items-center justify-center bg-gray-800 p-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                            src={resumeUrl}
                            alt="Resume preview"
                            className="max-w-full max-h-[300px] object-contain relative z-10"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Footer Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
        </div>
    )
}

export default ResumeCard;