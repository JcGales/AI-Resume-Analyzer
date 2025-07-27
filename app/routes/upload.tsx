import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        try {
            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) {
                setStatusText('Error: Failed to upload file');
                return;
            }

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile?.file) {
                setStatusText('Error: Failed to convert PDF to image');
                return;
            }

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) {
                setStatusText('Error: Failed to upload image');
                return;
            }

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }

            await kv.set(resume:${uuid}, JSON.stringify(data));

            setStatusText('Analyzing...');
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );

            if (!feedback) {
                setStatusText('Error: Failed to analyze resume');
                return;
            }

            let feedbackText;
            try {
                feedbackText = typeof feedback.message.content === 'string'
                    ? feedback.message.content
                    : feedback.message.content[0]?.text || '';

                const parsedFeedback = JSON.parse(feedbackText);
                data.feedback = parsedFeedback;

                await kv.set(resume:${uuid}, JSON.stringify(data));
                setStatusText('Analysis complete, redirecting...');

                setTimeout(() => navigate(/resume/${uuid}), 500);

            } catch (error) {
                console.error('Error parsing feedback:', error);
                setStatusText('Error: Invalid feedback format');
            }

        } catch (error) {
            console.error('Analysis error:', error);
            setStatusText('Error: Something went wrong during analysis');
        } finally {
            setIsProcessing(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <div className="min-h-screen bg-dark-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                        style={{
                            width: ${Math.random() * 300 + 100}px,
                            height: ${Math.random() * 300 + 100}px,
                            top: ${Math.random() * 100}%,
                            left: ${Math.random() * 100}%,
                            filter: 'blur(80px)',
                            animation: float ${Math.random() * 20 + 10}s infinite alternate ease-in-out,
                        }}
                    />
                ))}
            </div>

            <Navbar />

            <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
                {isProcessing ? (
                    <div className="text-center animate-in">
                        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple mb-6">
                            Analyzing Your Resume
                        </h1>
                        <div className="text-xl text-accent-purple mb-8">{statusText}</div>
                        <div className="max-w-md mx-auto">
                            <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden mb-8">
                                <div
                                    className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                                    style={{
                                        width: `${statusText.includes('complete') ? '100%' :
                                            statusText.includes('Analyzing') ? '75%' :
                                                statusText.includes('Preparing') ? '50%' :
                                                    statusText.includes('Uploading') ? '25%' : '10%'}`,
                                        transition: 'width 0.5s ease'
                                    }}
                                />
                            </div>
                            <div className="relative w-64 h-64 mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full opacity-20 animate-pulse"></div>
                                <div className="absolute inset-4 border-4 border-transparent border-t-accent-purple border-r-accent-blue rounded-full animate-spin"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mb-12 animate-in">
                        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple mb-4">
                            Smart Feedback For Your Dream Job
                        </h1>
                        <h2 className="text-3xl text-gray-200 font-medium">
                            Drop your resume for an ATS score and improvement tips
                        </h2>
                    </div>
                )}

                {!isProcessing && (
                    <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8 border border-dark-300 shadow-xl animate-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label htmlFor="company-name">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    placeholder="Google, Apple, etc."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="job-title">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="job-title"
                                    id="job-title"
                                    placeholder="Software Engineer, UX Designer, etc."
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-8 space-y-2">
                            <label htmlFor="job-description">
                                Job Description
                            </label>
                            <textarea
                                rows={5}
                                name="job-description"
                                id="job-description"
                                placeholder="Paste the job description here..."
                                required
                            />
                        </div>

                        <div className="mb-8 space-y-2">
                            <label>
                                Upload Resume (PDF)
                            </label>
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>

                        <button
                            type="submit"
                            disabled={!file}
                            className={`primary-button ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Analyze Resume
                        </button>
                    </form>
                )}
            </section>
        </div>
    )
}
export default Upload