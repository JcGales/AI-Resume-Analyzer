import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4">
                <div className="max-w-7xl mx-auto flex items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:bg-gray-700/50 px-3 py-2 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resume Preview Section */}
                <section className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
                    {imageUrl && resumeUrl ? (
                        <div className="relative group rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-xl">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <img
                                    src={imageUrl}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                    alt="Resume preview"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">
                                        Click to view PDF
                                    </span>
                                </div>
                            </a>
                        </div>
                    ) : (
                        <div className="h-96 flex items-center justify-center bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                            <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                <p className="mt-2 text-gray-400">Loading resume preview...</p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Feedback Section */}
                <section className="space-y-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Resume Analysis
                    </h1>

                    {feedback ? (
                        <div className="space-y-8 animate-in fade-in">
                            <div className="glass-effect p-6 rounded-xl border border-gray-700 shadow-lg">
                                <Summary feedback={feedback} />
                            </div>

                            <div className="glass-effect p-6 rounded-xl border border-gray-700 shadow-lg">
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            </div>

                            <div className="glass-effect p-6 rounded-xl border border-gray-700 shadow-lg">
                                <Details feedback={feedback} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-64 h-64 relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                                <div className="absolute inset-4 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-6 text-lg text-gray-300">Analyzing your resume...</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Glass effect utility */}
            <style jsx>{`
                .glass-effect {
                    background: rgba(30, 41, 59, 0.5);
                    backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    )
}

export default Resume