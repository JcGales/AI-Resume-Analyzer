import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedbackj from your own real Job !" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated){
      navigate('/auth?next=/')
    }
  }, [auth.isAuthenticated]);
  return <main className="bg-[url('public/assets/public/images/bg-main.svg')] bg-cover min-h-screen ">
    <Navbar/>

  <section className="main-section">
    <div className="page-heading py-16">
      <h1> Track Your Applications & Resume Ratings</h1>
      <h2>Review your submissions and check AI-Powered feedback.</h2>
    </div>
    {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume)=>(
              <div>
                <ResumeCard key={resume.id} resume={resume}/>
              </div>
          ))}
        </div>
    )}

  </section>

  </main>;
}
