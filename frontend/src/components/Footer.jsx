import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">PaperBrief</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered research paper summarizer. Understand any paper in seconds.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/app" className="text-sm text-gray-500 hover:text-green-500 transition-colors">Summarizer</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-500 hover:text-green-500 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Info</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-500">
                  Free: 3 summaries/day
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500">
                  Pro: Unlimited — $9/month
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} PaperBrief. Powered by FanTax.
          </p>
          <p className="text-xs text-gray-400">Built for researchers, students, and curious minds.</p>
        </div>
      </div>
    </footer>
  );
}
