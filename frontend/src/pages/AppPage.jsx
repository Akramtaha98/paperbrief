import { useState, useRef, useEffect } from "react";
import AdSensePlaceholder from "../components/AdSensePlaceholder";

const SUMMARY_TYPES = [
  { id: "brief", label: "Brief", desc: "2–3 paragraph overview" },
  { id: "detailed", label: "Detailed", desc: "Comprehensive breakdown" },
  { id: "eli5", label: "Simple (ELI5)", desc: "Plain-English, no jargon" },
];

const STORAGE_KEY = "paperbrief_history";
const PREMIUM_KEY = "paperbrief_premium";

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
}

function isPremium() {
  return localStorage.getItem(PREMIUM_KEY) === "true";
}

function ComplexityBadge({ level }) {
  const colors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors[level] || "bg-gray-100 text-gray-600"}`}>
      {level}
    </span>
  );
}

function SummaryCard({ result, type }) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    const text = [
      `Title: ${result.title}`,
      `Field: ${result.field}`,
      `Complexity: ${result.complexity}`,
      `\nSummary:\n${result.summary}`,
      `\nKey Findings:\n${result.key_findings.map((f, i) => `${i + 1}. ${f}`).join("\n")}`,
      `\nMethodology:\n${result.methodology}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-green-500 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-white text-xl leading-tight truncate">{result.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-green-100 text-xs">{result.field}</span>
              <span className="text-green-300 text-xs">&bull;</span>
              <ComplexityBadge level={result.complexity} />
              <span className="text-green-300 text-xs">&bull;</span>
              <span className="bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                {type}
              </span>
            </div>
          </div>
          <button
            onClick={copyText}
            title="Copy to clipboard"
            className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-colors"
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Summary</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{result.summary}</p>
        </div>

        {/* Key Findings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Findings</h3>
          <ul className="space-y-2.5">
            {result.key_findings.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Methodology</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{result.methodology}</p>
        </div>
      </div>
    </div>
  );
}

function HistoryItem({ item, onLoad, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-green-200 transition-colors group">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{item.data.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {item.data.field} &bull; <span className="capitalize">{item.type}</span> &bull;{" "}
          {new Date(item.timestamp).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onLoad(item)}
          className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
          title="Load"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AppPage() {
  const [tab, setTab] = useState("text"); // "text" | "pdf"
  const [text, setText] = useState("");
  const [summaryType, setSummaryType] = useState("brief");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeType, setActiveType] = useState("brief");
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [history, setHistory] = useState(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);

  // Scroll to result when it appears
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLimitReached(false);
    setResult(null);

    if (tab === "text" && text.trim().length < 100) {
      setError("Please paste at least 100 characters of paper text.");
      return;
    }
    if (tab === "pdf" && !pdfFile) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (tab === "pdf") {
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("summaryType", summaryType);
        response = await fetch("/api/summarize", {
          method: "POST",
          headers: { ...(isPremium() ? { "x-premium-user": "true" } : {}) },
          body: formData,
        });
      } else {
        response = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isPremium() ? { "x-premium-user": "true" } : {}),
          },
          body: JSON.stringify({ text, summaryType }),
        });
      }

      const json = await response.json();

      if (!response.ok) {
        if (json.limitReached) {
          setLimitReached(true);
          setError(json.message || "Daily limit reached. Upgrade to Pro for unlimited access.");
        } else {
          setError(json.error || "Something went wrong. Please try again.");
        }
        return;
      }

      setResult(json.data);
      setActiveType(json.summaryType);

      // Save to history
      const entry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: json.summaryType,
        data: json.data,
      };
      const updated = [entry, ...history];
      setHistory(updated);
      saveHistory(updated);
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
      setTab("pdf");
    }
  };

  const loadHistoryItem = (item) => {
    setResult(item.data);
    setActiveType(item.type);
    setShowHistory(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const deleteHistoryItem = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ─── Sidebar AdSense ─── */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <AdSensePlaceholder slot="sidebar-1" className="w-full h-64 rounded-xl" />
            <AdSensePlaceholder slot="sidebar-2" className="w-full h-64 rounded-xl" />
          </div>

          {/* ─── Main Content ─── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Research Paper Summarizer</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isPremium() ? "Pro — Unlimited" : "Free — 3 summaries/day"}
                </p>
              </div>
              {history.length > 0 && (
                <button
                  onClick={() => setShowHistory((s) => !s)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  History ({history.length})
                </button>
              )}
            </div>

            {/* History panel */}
            {showHistory && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-700">Recent Summaries</h3>
                  <button
                    onClick={() => { setHistory([]); saveHistory([]); }}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                {history.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    onLoad={loadHistoryItem}
                    onDelete={deleteHistoryItem}
                  />
                ))}
              </div>
            )}

            {/* Input card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Tab switcher */}
              <div className="flex border-b border-gray-100">
                {[
                  { id: "text", label: "Paste Text" },
                  { id: "pdf", label: "Upload PDF" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-1 py-3.5 text-sm font-medium transition-colors ${
                      tab === t.id
                        ? "text-green-500 border-b-2 border-green-500 bg-green-50/50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Text area */}
                {tab === "text" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Paper Text
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={10}
                      placeholder="Paste your research paper abstract or full text here..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none leading-relaxed"
                    />
                    <p className="text-xs text-gray-400 mt-1.5 text-right">
                      {text.length.toLocaleString()} chars
                      {text.length > 15000 && (
                        <span className="text-yellow-500 ml-1">(first 15k used)</span>
                      )}
                    </p>
                  </div>
                )}

                {/* PDF upload */}
                {tab === "pdf" && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-xl p-10 text-center cursor-pointer transition-colors group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />
                    {pdfFile ? (
                      <div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="font-medium text-gray-800 text-sm">{pdfFile.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPdfFile(null); }}
                          className="mt-3 text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-12 h-12 bg-gray-100 group-hover:bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-600">Drop PDF here or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">Max 10 MB</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Summary type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Summary Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {SUMMARY_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSummaryType(t.id)}
                        className={`rounded-xl px-4 py-3 text-left transition-colors border ${
                          summaryType === t.id
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <div className="font-medium text-sm">{t.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className={`rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${
                    limitReached ? "bg-amber-50 border border-amber-200 text-amber-800" : "bg-red-50 border border-red-200 text-red-700"
                  }`}>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      {error}
                      {limitReached && (
                        <a href="/pricing" className="block mt-1 font-semibold text-amber-700 hover:underline">
                          Upgrade to Pro &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Analyzing paper...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Summarize Paper
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* AdSense between input and result */}
            <AdSensePlaceholder slot="mid-banner" className="w-full rounded-xl" />

            {/* Result */}
            {result && (
              <div ref={resultRef}>
                <SummaryCard result={result} type={activeType} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
