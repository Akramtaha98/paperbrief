/**
 * AdSensePlaceholder
 * Replace this with a real Google AdSense <ins> tag when ready.
 * Set VITE_ADSENSE_CLIENT in .env and update the data-ad-slot.
 */
export default function AdSensePlaceholder({ slot = "banner", className = "" }) {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    return (
      <div
        className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400 select-none ${className}`}
        style={{ minHeight: 90 }}
      >
        Ad Placeholder ({slot})
      </div>
    );
  }

  // Production: render real AdSense unit
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
