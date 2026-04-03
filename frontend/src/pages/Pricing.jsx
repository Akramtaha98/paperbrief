import { useState } from "react";
import { Link } from "react-router-dom";

const PREMIUM_KEY = "paperbrief_premium";

function Check() {
  return (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Pricing() {
  const [isPro, setIsPro] = useState(
    () => localStorage.getItem(PREMIUM_KEY) === "true"
  );
  const [activated, setActivated] = useState(false);

  // Demo: toggle premium flag in localStorage
  const activatePro = () => {
    localStorage.setItem(PREMIUM_KEY, "true");
    setIsPro(true);
    setActivated(true);
  };

  const deactivatePro = () => {
    localStorage.removeItem(PREMIUM_KEY);
    setIsPro(false);
    setActivated(false);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Great for occasional research.",
      highlight: false,
      cta: isPro ? "Current: Pro" : "Get Started",
      ctaHref: "/app",
      ctaDisabled: false,
      features: [
        { label: "3 summaries per day", included: true },
        { label: "Brief, Detailed & ELI5 modes", included: true },
        { label: "PDF upload", included: true },
        { label: "Summary history (last 20)", included: true },
        { label: "Copy to clipboard", included: true },
        { label: "Unlimited summaries", included: false },
        { label: "Priority processing", included: false },
        { label: "API access (coming soon)", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For researchers, students & teams who read a lot.",
      highlight: true,
      cta: isPro ? "Pro Active" : "Upgrade to Pro",
      ctaAction: isPro ? deactivatePro : activatePro,
      features: [
        { label: "3 summaries per day", included: true },
        { label: "Brief, Detailed & ELI5 modes", included: true },
        { label: "PDF upload", included: true },
        { label: "Summary history (last 20)", included: true },
        { label: "Copy to clipboard", included: true },
        { label: "Unlimited summaries", included: true },
        { label: "Priority processing", included: true },
        { label: "API access (coming soon)", included: true },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 via-white to-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, honest pricing</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Start free, upgrade when you need more. No hidden fees, cancel any time.
        </p>
      </section>

      {/* Demo activation notice */}
      {activated && (
        <div className="max-w-2xl mx-auto px-4 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2 text-green-700 text-sm animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro activated (demo mode). Rate limits are bypassed in this session.
            <Link to="/app" className="font-semibold ml-auto hover:underline">
              Try it now &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Plan cards */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border overflow-hidden transition-shadow ${
                plan.highlight
                  ? "border-green-400 shadow-lg shadow-green-100"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="bg-green-500 text-center text-white text-xs font-semibold py-1.5 tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                {/* Plan header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>

                {/* CTA */}
                {plan.ctaAction ? (
                  <button
                    onClick={plan.ctaAction}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors mb-6 ${
                      isPro && plan.highlight
                        ? "bg-gray-100 text-gray-500 cursor-pointer hover:bg-red-50 hover:text-red-500"
                        : plan.highlight
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isPro && plan.highlight ? "Deactivate Pro (Demo)" : plan.cta}
                  </button>
                ) : (
                  <Link
                    to={plan.ctaHref}
                    className={`block w-full py-3 rounded-xl font-semibold text-sm text-center transition-colors mb-6 ${
                      plan.highlight
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}

                {/* Feature list */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      {f.included ? <Check /> : <Cross />}
                      <span className={`text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently asked questions</h2>
        <div className="space-y-5">
          {[
            {
              q: "How does the free plan work?",
              a: "You get 3 paper summaries per day, tracked by IP address. No account required — just start summarizing.",
            },
            {
              q: "What does Pro include?",
              a: "Unlimited summaries, priority AI processing, and early access to new features like API access. All three summary modes are available on both plans.",
            },
            {
              q: "Can I upload PDFs?",
              a: "Yes. Both free and Pro plans support PDF uploads up to 10 MB. We extract the text and pass it to the AI.",
            },
            {
              q: "Is my data stored?",
              a: "Summary history is stored locally in your browser (localStorage only). We do not store your paper content on our servers.",
            },
            {
              q: "What AI model is used?",
              a: "PaperBrief uses Google's Gemini 1.5 Flash model to generate high-quality, structured summaries.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-gray-50 rounded-xl border border-gray-100">
              <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-800 flex items-center justify-between list-none">
                {q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
