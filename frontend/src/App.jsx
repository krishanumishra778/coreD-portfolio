import { useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import WordReveal from "./components/ui/WordReveal.jsx";
import ClassicNavbar from "./components/layout/ClassicNavbar.jsx";
import ClassicFooter from "./components/layout/ClassicFooter.jsx";
import CustomCursor from "./components/ui/CustomCurser.jsx";
import { ChatbotWidget } from "./components/chatbot/ChatbotWidget.jsx";
import PageMetadata from "./components/layout/PageMetadata.jsx";
import AnalyticsPreferences from "./components/layout/AnalyticsPreferences.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import SeeOurWork from "./pages/SeeOurWork.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import Blog, { BlogArticle } from "./pages/Blog.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyNotice from "./pages/PrivacyNotice.jsx";
import TermsCondition from "./pages/TermsCondition.jsx";
import PricingPolicy from "./pages/PricingPolicy.jsx";

export default function App() {
  const { pathname, hash, search, key } = useLocation();
  const previous = useRef({ pathname, search, hash });
  const main = useRef(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const changedPath = pathname !== previous.current.pathname;
      const changedSearchOnly = !changedPath && hash === previous.current.hash && search !== previous.current.search;
      previous.current = { pathname, search, hash };
      if (changedSearchOnly) return;
      if (hash) {
        let id;
        try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (target) {
          if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: "start" });
          return;
        }
      }
      window.scrollTo(0, 0);
      if (changedPath) main.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, search, key]);

  return (
    <div className="cd-site cd-site--classic">
      <PageMetadata />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <CustomCursor />
      <ClassicNavbar />
      <WordReveal />
      <main id="main-content" className={pathname === "/" ? "cd-main classic-home" : "cd-main"} tabIndex={-1} ref={main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/see-our-work" element={<SeeOurWork />} />
          <Route path="/seeOurWork" element={<Navigate replace to="/see-our-work" />} />
          <Route path="/case-studies" element={<Navigate replace to="/see-our-work" />} />
          <Route path="/case-studies/:id" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reach-us" element={<Contact />} />
          <Route path="/termsCondition" element={<TermsCondition />} />
          <Route path="/pricingPolicy" element={<PricingPolicy />} />
          <Route path="/pricing-policy" element={<Navigate replace to="/pricingPolicy" />} />
          <Route path="/privacyPolicy" element={<PrivacyNotice />} />
          <Route path="*" element={<header className="cd-shell page-intro"><h1>Page not found</h1><Link to="/" className="cd-text-link">Back to Home</Link></header>} />
        </Routes>
      </main>
      <ClassicFooter />
      <AnalyticsPreferences />
      <ChatbotWidget classic />
    </div>
  );
}
