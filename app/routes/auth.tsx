import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next || '/');
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <div className="w-full max-w-md">
                <div className="relative group">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 blur-md"></div>

                    <section className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <div className="flex flex-col items-center gap-4 text-center mb-8">
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Welcome Back
                            </h1>
                            <h2 className="text-gray-300 text-lg">
                                {auth.isAuthenticated ? 'Ready to continue?' : 'Sign in to access your dashboard'}
                            </h2>
                        </div>

                        <div className="mt-6">
                            {isLoading ? (
                                <button
                                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium flex items-center justify-center"
                                    disabled
                                >
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button
                                            className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                            onClick={auth.signOut}
                                        >
                                            Sign Out
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                            onClick={auth.signIn}
                                        >
                                            Sign In
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        {!auth.isAuthenticated && (
                            <p className="mt-6 text-center text-gray-400 text-sm">
                                By continuing, you agree to our Terms of Service
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Auth