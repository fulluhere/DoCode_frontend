// frontend/src/pages/ProblemDetail.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getProblemBySlug } from "../api/problems";
import { createSubmission, getSubmission } from "../api/submissions";

const LANGUAGE_DEFAULTS = {
  cpp: `#include<iostream>\nusing namespace std;\nint main(){\n    // your code here\n    return 0;\n}`,
  python: `# your code here\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}`,
  javascript: `// your code here\n`,
};

export default function ProblemDetail() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(LANGUAGE_DEFAULTS["python"]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const pollRef = useRef(null);

  useEffect(() => {
    getProblemBySlug(slug)
      .then((res) => setProblem(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load problem"))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    return () => clearInterval(pollRef.current); // cleanup on unmount
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(LANGUAGE_DEFAULTS[lang]);
  };

  const pollForResult = (submissionId) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await getSubmission(submissionId);
        const submission = res.data.submission;
        if (submission.verdict !== "PENDING") {
          clearInterval(pollRef.current);
          setResult(submission);
          setSubmitting(false);
        }
      } catch (err) {
        clearInterval(pollRef.current);
        setSubmitting(false);
        setResult({ verdict: "ERROR", errorMessage: "Failed to fetch result" });
      }
    }, 1500); // poll every 1.5s
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await createSubmission(problem._id, language, code);
      pollForResult(res.data.submissionId);
    } catch (err) {
      setSubmitting(false);
      setResult({ verdict: "ERROR", errorMessage: err.response?.data?.message || "Submission failed" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!problem) return null;

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ flex: 1 }}>
        <h2>{problem.title}</h2>
        <p><strong>Difficulty:</strong> {problem.difficulty}</p>
        <p><strong>Tags:</strong> {problem.tags?.join(", ")}</p>
        <p style={{ whiteSpace: "pre-wrap" }}>{problem.description}</p>
        <p><strong>Constraints:</strong> {problem.constraints}</p>

        <h3>Sample Test Cases</h3>
        {problem.testCases?.map((tc, i) => (
          <div key={i} style={{ marginBottom: 10, padding: 10, background: "#f5f5f5" }}>
            <p><strong>Input:</strong></p>
            <pre>{tc.input}</pre>
            <p><strong>Expected Output:</strong></p>
            <pre>{tc.expectedOutput}</pre>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>

        <Editor
          height="400px"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />

        <button onClick={handleSubmit} disabled={submitting} style={{ marginTop: 10 }}>
          {submitting ? "Judging..." : "Submit"}
        </button>

        {result && (
          <div style={{ marginTop: 15, padding: 10, background: "#f0f0f0" }}>
            <p><strong>Verdict:</strong> {result.verdict}</p>
            {result.runtime !== undefined && <p><strong>Runtime:</strong> {result.runtime}ms</p>}
            {result.errorMessage && <pre style={{ color: "red" }}>{result.errorMessage}</pre>}
            {result.output && <pre>{result.output}</pre>}
          </div>
        )}
      </div>
    </div>
  );
}