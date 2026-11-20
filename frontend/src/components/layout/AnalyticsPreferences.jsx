import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { analyticsChoice, chooseAnalytics, startAnalytics, trackPage } from "../lib/analytics.js";

export default function AnalyticsPreferences() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(analyticsChoice() === null);
    startAnalytics();
    const open = () => setVisible(true);
    window.addEventListener("cored:analytics-preferences", open);
    return () => window.removeEventListener("cored:analytics-preferences", open);
  }, []);
  useEffect(() => { trackPage(pathname); }, [pathname]);

  function choose(allowed) {
    const loaded = Boolean(document.getElementById("cored-google-tag-manager"));
    chooseAnalytics(allowed);
    setVisible(false);
    if (allowed) trackPage(pathname);
    // Unload active Google listeners after withdrawal; no further tags load on reload.
    else if (loaded) window.location.reload();
  }

  if (!visible) return null;
  return <aside className="analytics-preferences" aria-labelledby="analytics-choice-title" data-reveal="off">
    <div><h2 id="analytics-choice-title">Allow website analytics?</h2><p>With your permission, Google Analytics helps us understand which pages people use. Your enquiry details are not sent to analytics. <Link to="/privacyPolicy">Privacy Policy</Link></p></div>
    <div className="analytics-choice-actions"><button type="button" className="cd-button cd-button--line" onClick={() => choose(false)}>Reject analytics</button><button type="button" className="cd-button cd-button--primary" onClick={() => choose(true)}>Allow analytics</button></div>
  </aside>;
}
