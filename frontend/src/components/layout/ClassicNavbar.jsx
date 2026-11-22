import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAVBAR_BG = "#14161aeb";

const navigation = [
  { label: "Home", path: "/", end: true },
  { label: "Services & Pricing", path: "/services", end: true },
  { label: "See Our Work", path: "/see-our-work" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
];

export default function ClassicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const toggle = useRef(null);
  const header = useRef(null);

  // Desktop navigation link styles
  const navLinkClass = ({ isActive }) =>
    [
      "relative inline-flex items-center rounded-full px-3.5 py-2.5",
      "text-[13px] font-medium tracking-wide",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isActive
        ? "bg-white/[0.08] text-orange-400"
        : "text-white/70 hover:bg-white/[0.05] hover:text-white",
    ].join(" ");

  // Mobile navigation link styles
  const mobileLinkClass = ({ isActive }) =>
    [
      "flex w-full items-center justify-between rounded-xl px-4 py-3.5",
      "text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isActive
        ? "bg-orange-400/10 text-orange-400"
        : "text-white/75 hover:bg-white/[0.05] hover:text-white",
    ].join(" ");

  // Mobile menu button styles
  const menuButtonClass = `
    grid h-10 w-10 shrink-0 place-items-center rounded-full
    border transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-orange-400 lg:hidden
    border-white/10 bg-white/[0.03] text-white
    hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-400
  `;

  // Close mobile menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };

    if (!menuOpen) return;
    const closeOnOutsidePress = (event) => {
      if (!header.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  // Close the menu after navigation
  const handleNavigation = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header ref={header} className="classic-nav-shell fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav
          aria-label="Main navigation"
          style={{ backgroundColor: NAVBAR_BG }}
          className="
            relative mx-auto flex max-w-7xl
            items-center justify-between gap-3
            rounded-full border px-3 py-2.5
            sm:px-5 sm:py-3
            border-white/10 text-white
            transition-colors duration-200
          "
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="CoreD home"
            onClick={handleNavigation}
            className="group flex shrink-0 items-center"
          >
            <img
              src="/Images/CoreD.png"
              alt="CoreD"
              className="
                h-8 w-auto max-w-[112px] object-contain
                transition-opacity duration-200
                group-hover:opacity-80
                sm:h-9 sm:max-w-[140px]
              "
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Contact Link + Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/contact"
              onClick={handleNavigation}
              className="cd-button cd-button--primary cd-button--nav-desktop"
            >
            Reach Us Out
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
            />
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              ref={toggle}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className={menuButtonClass}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          hidden={!menuOpen}
          style={{ backgroundColor: NAVBAR_BG }}
          className={`
            mx-auto mt-3 max-h-[calc(100dvh-6rem)] max-w-7xl overflow-y-auto
            rounded-2xl border
            border-white/10 text-white
            transition-all duration-200
            lg:hidden
            ${
              menuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible pointer-events-none -translate-y-2 opacity-0"
            }
          `}
        >
          <div className="p-3">
            {/* Mobile Menu Heading */}
            <div className="mb-2 flex items-center justify-between px-4 py-2">
              <span
                className="
                  text-[10px] font-semibold uppercase
                  tracking-[0.24em] text-white/40
                "
              >
                Navigation
              </span>

              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-orange-400"
              />
            </div>

            {/* Mobile Links */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={handleNavigation}
                  className={mobileLinkClass}
                >
                  {item.label}

                  <ArrowUpRight size={15} aria-hidden="true" />
                </NavLink>
              ))}
            </div>

            {/* Mobile Contact Link */}
            <Link
              to="/contact"
              onClick={handleNavigation}
              className="cd-button cd-button--primary cd-button--block mt-3"
            >
              Reach Us Out
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
