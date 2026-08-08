import { useState } from "react";
import { analyzeResume } from "./services/api";
import MatchResult from "./components/MatchResult";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Sending resume for analysis...");

      const data = await analyzeResume(
        resume,
        jobDescription
      );

      console.log("✅ Backend response received:", data);

      setResult(data);

      // Move directly to results view
      setPage("results");

    } catch (error) {
    console.error("❌ Error analyzing resume:", error);

    if (error.response) {
      console.error("Backend response:", error.response.data);
      console.error("Status:", error.response.status);

      const message =
        error.response.data?.detail ||
        "Unable to analyze the resume.";

      alert(message);
    } else {
      alert("Unable to connect to the backend.");
    }
  }finally {
      setLoading(false);
    }
  };

  const startNewAnalysis = () => {
    setResume(null);
    setJobDescription("");
    setResult(null);
    setPage("analyzer");
  };

  return (
    <main className="app">

      {/* =========================
          HOME / LANDING VIEW
      ========================= */}

      {page === "home" && (
        <div className="screen home-screen">

          <header className="topbar">
            <div className="brand">
              <span className="brand-mark">R</span>
              <span>Resumate</span>
            </div>

            <span className="header-label">
              Resume Intelligence
            </span>
          </header>

          <section className="hero">

            <div className="hero-content">

              <p className="eyebrow">
                AI-POWERED CAREER TOOL
              </p>

              <h1>
                Know how well your resume
                <br />
                fits the role.
              </h1>

              <p className="hero-description">
                Compare your resume with a job description
                and discover your strengths, skill gaps,
                and overall match.
              </p>

            </div>

            <button
              className="start-button"
              onClick={() => setPage("analyzer")}
            >
              <span>Start analysis</span>
              <span className="button-arrow">→</span>
            </button>

          </section>

          <div className="hero-footer">
            <span>Resume Match</span>
            <span>Skill Gaps</span>
            <span>AI Insights</span>
          </div>

        </div>
      )}

      {/* =========================
          ANALYZER VIEW
      ========================= */}

      {page === "analyzer" && (
        <div className="screen analyzer-screen">

          <header className="topbar">

            <div className="brand">
              <span className="brand-mark">R</span>
              <span>Resumate</span>
            </div>

            <button
              className="back-button"
              onClick={() => setPage("home")}
            >
              ← Back
            </button>

          </header>

          <section className="analyzer-content">

            <div className="page-heading">
              <p className="eyebrow">
                RESUME ANALYSIS
              </p>

              <h1>
                Tell us about the opportunity.
              </h1>

              <p>
                Upload your resume and provide the job
                description you are applying for.
              </p>
            </div>

            <div className="form-grid">

              {/* Resume */}
              <div className="form-block">

                <div className="form-heading">
                  <span>01</span>

                  <div>
                    <h2>Your resume</h2>
                    <p>
                      Upload your latest resume
                    </p>
                  </div>
                </div>

                <label className="upload-area">

                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) =>
                      setResume(
                        e.target.files[0]
                      )
                    }
                  />

                  <div className="upload-symbol">
                    ↑
                  </div>

                  {resume ? (
                    <>
                      <strong>
                        {resume.name}
                      </strong>

                      <small>
                        Ready to analyze
                      </small>
                    </>
                  ) : (
                    <>
                      <strong>
                        Choose your resume
                      </strong>

                      <small>
                        PDF or DOCX
                      </small>
                    </>
                  )}

                </label>

              </div>

              {/* Job Description */}
              <div className="form-block">

                <div className="form-heading">
                  <span>02</span>

                  <div>
                    <h2>Job description</h2>

                    <p>
                      Tell us about the role
                    </p>
                  </div>
                </div>

                <textarea
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(
                      e.target.value
                    )
                  }
                  placeholder="Paste the job description you're applying for..."
                />

              </div>

            </div>

            <div className="analyze-action">

              <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze resume →"}
              </button>

              {loading && (
                <p>
                  Comparing your experience with the role...
                </p>
              )}

            </div>

          </section>

        </div>
      )}

      {/* =========================
          RESULTS VIEW
      ========================= */}

      {page === "results" && result && (
        <div className="screen results-screen">

          <header className="topbar">

            <div className="brand">
              <span className="brand-mark">R</span>
              <span>Resumate</span>
            </div>

            <button
              className="back-button"
              onClick={startNewAnalysis}
            >
              + New analysis
            </button>

          </header>

          <MatchResult result={result} />

        </div>
      )}

    </main>
  );
}

export default App;
