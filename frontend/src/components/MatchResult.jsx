function MatchResult({ result }) {

  const score = Number(result.match_score) || 0;

  let matchLabel = "Low Match";

  if (score >= 80) {
    matchLabel = "Strong Match";
  } else if (score >= 60) {
    matchLabel = "Good Match";
  } else if (score >= 40) {
    matchLabel = "Moderate Match";
  }

  /*
    Circle calculations
  */
  const radius = 86;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference -
    (score / 100) * circumference;

  return (
    <section className="results-content">

      {/* Header */}
      <div className="results-heading">

        <div>
          <p className="eyebrow">
            RESUME ANALYSIS
          </p>

          <h1>
            Your match report
          </h1>

          <p>
            Here's how your resume compares with
            the job description.
          </p>
        </div>

      </div>

      {/* =========================
          SCORE
      ========================= */}

      <div className="score-area">

        <div className="score-circle">

          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
          >

            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#e2e0db"
              strokeWidth="10"
            />

            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#171717"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              transform="rotate(-90 110 110)"
            />

          </svg>

          <div className="score-value">
            <strong>{score}%</strong>
            <span>{matchLabel}</span>
          </div>

        </div>

        <div className="score-description">

          <span className="score-label">
            OVERALL MATCH
          </span>

          <h2>
            {result.recommendation}
          </h2>

          <p>
            Your resume shows a strong alignment
            with the requirements of this role.
          </p>

        </div>

      </div>

      {/* =========================
          SKILLS
      ========================= */}

      <div className="result-grid">

        {/* Matched */}
        <div className="result-block">

          <div className="result-block-heading">
            <span>01</span>

            <h2>
              Matched skills
            </h2>
          </div>

          <div className="skill-list">

            {result.matched_skills?.map(
              (skill, index) => (
                <span
                  className="skill matched"
                  key={index}
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>

        {/* Missing */}
        <div className="result-block">

          <div className="result-block-heading">
            <span>02</span>

            <h2>
              Skill gaps
            </h2>
          </div>

          <div className="skill-list">

            {result.missing_skills?.map(
              (skill, index) => (
                <span
                  className="skill missing"
                  key={index}
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>

      </div>

      {/* =========================
          STRENGTHS / WEAKNESSES
      ========================= */}

      <div className="result-grid">

        <div className="result-block">

          <div className="result-block-heading">
            <span>03</span>

            <h2>
              What's working
            </h2>
          </div>

          <ul className="insight-list">

            {result.strengths?.map(
              (strength, index) => (
                <li key={index}>
                  <span className="insight-icon">
                    ✓
                  </span>

                  {strength}
                </li>
              )
            )}

          </ul>

        </div>

        <div className="result-block">

          <div className="result-block-heading">
            <span>04</span>

            <h2>
              Areas to improve
            </h2>
          </div>

          <ul className="insight-list">

            {result.weaknesses?.map(
              (weakness, index) => (
                <li key={index}>
                  <span className="insight-icon">
                    →
                  </span>

                  {weakness}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

      {/* =========================
          RECOMMENDATION
      ========================= */}

      <div className="recommendation">

        <p className="score-label">
          RECOMMENDATION
        </p>

        <h2>
          {result.recommendation}
        </h2>

      </div>

      {/* =========================
          REASONING
      ========================= */}

      <div className="reasoning">

        <p className="score-label">
          WHY THIS SCORE?
        </p>

        <p>
          {result.reasoning}
        </p>

      </div>

    </section>
  );
}

export default MatchResult;

