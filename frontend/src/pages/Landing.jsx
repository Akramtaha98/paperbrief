import { Link } from "react-router-dom";
import AdSensePlaceholder from "../components/AdSensePlaceholder";

const DEMO_RESULT = {
  title: "Attention Is All You Need",
  field: "Machine Learning",
  complexity: "Advanced",
  summary:
    "This landmark paper introduces the Transformer architecture, a novel neural network model relying entirely on self-attention mechanisms, dispensing with recurrence and convolutions altogether. The model achieves superior quality on machine translation tasks while being more parallelizable and requiring significantly less training time than previous architectures.",
  key_findings: [
    "Self-attention alone is sufficient for sequence-to-sequence tasks, outperforming recurrent and convolutional models.",
    "The Transformer achieves 28.4 BLEU on WMT 2014 English-to-German, surpassing all previous state-of-the-art results.",
    "Multi-head attention allows the model to jointly attend to information from different representation subspaces.",
    "Positional encodings effectively replace recurrence by injecting sequence-order information.",
  ],
  methodology: "Empirical evaluation using encoder-decoder architecture with multi-head self-attention on machine translation benchmarks (WMT 2014).",
};

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

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Powered by FanTax
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Understand any research paper{" "}
            <span className="text-green-500">in seconds</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste text or upload a PDF. PaperBrief extracts the summary, key findings, methodology, and complexity — so you can focus on what matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Summarize a Paper — Free
            </Link>
            <Link
              to="/pricing"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3.5 rounded-xl border border-gray-200 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">No account required &bull; 3 free summaries/day</p>
        </div>
      </section>

      {/* AdSense top */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <AdSensePlaceholder slot="top-banner" className="w-full" />
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to understand research</h2>
          <p className="text-gray-500">Three powerful summary modes for every context.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            title="Brief Summary"
            desc="A concise 2–3 paragraph overview for researchers who need to triage papers quickly."
          />
          <FeatureCard
            icon={<svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
            title="Detailed Summary"
            desc="In-depth coverage of all major sections — great for thorough literature reviews."
          />
          <FeatureCard
            icon={<svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Simple / ELI5"
            desc="Plain-English explanation with analogies — perfect for sharing outside your field."
          />
        </div>
      </section>

      {/* Live Demo */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">See it in action</h2>
            <p className="text-gray-500">Example output for <em>Attention Is All You Need</em> (Vaswani et al., 2017)</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up">
            {/* Header bar */}
            <div className="bg-green-500 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white text-lg">{DEMO_RESULT.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-green-100 text-xs">{DEMO_RESULT.field}</span>
                  <span className="text-green-200 text-xs">&bull;</span>
                  <ComplexityBadge level={DEMO_RESULT.complexity} />
                </div>
              </div>
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">Brief</span>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Summary</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{DEMO_RESULT.summary}</p>
              </div>

              {/* Key Findings */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Findings</h4>
                <ul className="space-y-2">
                  {DEMO_RESULT.key_findings.map((f, i) => (
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
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Methodology</h4>
                <p className="text-gray-700 text-sm">{DEMO_RESULT.methodology}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm inline-block"
            >
              Try With Your Paper
            </Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { stat: "3", label: "Free summaries per day" },
            { stat: "3 modes", label: "Brief · Detailed · ELI5" },
            { stat: "Instant", label: "AI-powered analysis" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-4xl font-extrabold text-green-500 mb-1">{stat}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom AdSense */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <AdSensePlaceholder slot="bottom-banner" className="w-full" />
      </div>
    </div>
  );
}
