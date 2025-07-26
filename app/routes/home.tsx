import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
        const resumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
            JSON.parse(resume.value) as Resume
        ));
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Error loading resumes:", error);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);

  // @ts-ignore
  // @ts-ignore
  return (
      <div className="min-h-screen">
        <Navbar/>
        {/* Hero Section (Full Viewport) */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <div className="mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Smarter Resumes. Brighter Futures.
              </h1>
              <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto mb-10">
                Instant AI feedback to help you stand out and land the role you deserve.
              </p>
              <Link
                  to="/upload"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Animated Resume Collection Section */}
        <section className="min-h-screen w-full bg-gray-900 relative overflow-hidden py-24 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              {[...Array(20)].map((_, i) => (
                  <div
                      key={i}
                      className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{
                        width: `${Math.random() * 300 + 100}px`,
                        height: `${Math.random() * 300 + 100}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: 'blur(40px)',
                        animation: `float ${Math.random() * 20 + 10}s infinite alternate ease-in-out`,
                        opacity: Math.random() * 0.3 + 0.1
                      }}
                  />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {loadingResumes && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400">Loading your resumes...</p>
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <>
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Resume Collection</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                      AI-powered feedback to help you land your dream job
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} />
                    ))}
                  </div>
                </>
            )}

            {!loadingResumes && resumes.length === 0 && (
                <div className="max-w-2xl mx-auto text-center py-16">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Start Building Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Resume Collection</span>
                  </h2>
                  <p className="text-gray-400 mb-8 text-lg">
                    Upload your first resume to receive AI-powered feedback and track your job applications.
                  </p>
                  <Link
                      to="/upload"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Resume
                  </Link>
                </div>
            )}
          </div>
        </section>

        {/* Add the floating animation to your global CSS */}
        <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
      </div>
  );
}