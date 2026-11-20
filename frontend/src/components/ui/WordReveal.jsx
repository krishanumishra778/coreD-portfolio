import { Fragment, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/*
 * Scroll reveal for the whole site.
 *
 * - <RevealWords> splits a heading into words so they can come into focus one by one.
 * - <WordReveal /> (mounted once in App) watches the page and gives every heading,
 *   paragraph, list item, card, figure and image a slow reveal the first time it
 *   scrolls into view.
 *
 * Nothing is hidden without JavaScript or when the visitor prefers reduced motion.
 * Elements that hold links or buttons only fade, so they never move under the pointer.
 */

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const HEADINGS = "h1,h2,h3,h4,h5,h6";
const TEXT = "p,dt,dd,blockquote,figcaption,li";
const BLOCKS = "article,figure,details,img,.cd-actions";
// Containers that animate as one piece: their children never animate on their own.
const GROUPS = "article,figure,details,[data-reveal-group]";
// Never touched: controls, live regions, carousels, marquees and anything the page opts out of.
const SKIP = [
  "form", "nav", "dialog", "[role='alert']", "[role='status']", "[aria-hidden='true']",
  "[aria-roledescription]", "[data-reveal='off']", "#client-work", ".classic-portfolio-track",
  ".cursor-dot", ".cursor-ring",
].join(",");
const INTERACTIVE = "a,button,input,select,textarea,summary,[role='button']";

export function RevealWords({ children, start = 0 }) {
  return children.trim().split(/\s+/).map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="reveal-word" style={{ "--word-index": start + index }}>{word}</span>
    </Fragment>
  ));
}

function revealKind(node) {
  if (node.matches(HEADINGS)) return "heading";
  if (node.matches("img")) return "image";
  if (node.matches("li") && node.querySelector(HEADINGS + ",p,img")) return "block";
  if (node.matches(BLOCKS)) return "block";
  return "text";
}

export default function WordReveal() {
  const { pathname, search } = useLocation();

  useIsomorphicLayoutEffect(() => {
    const root = document.querySelector(".cd-site");
    if (!root || !window.IntersectionObserver) return undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motion.matches) return undefined;

    const tracked = new Set();
    let frame = 0;

    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      entering.forEach(({ target }, index) => {
        // Items that arrive together cascade; the delay is capped so nothing feels stuck.
        target.style.setProperty("--rv-delay", Math.min(index, 5) * 110 + "ms");
        target.classList.add("rv-in", "has-entered");
        target.classList.remove("reveal-pending");
        observer.unobserve(target);
      });
    }, { rootMargin: "0px 0px -9% 0px", threshold: 0 });

    function prepare(node) {
      if (tracked.has(node) || node.closest(SKIP)) return;
      // Anything inside a group animates with the group.
      const group = node.parentElement?.closest(GROUPS);
      if (group && root.contains(group)) return;
      const kind = revealKind(node);
      // A list item or quote that wraps other text is left to its children.
      if (kind === "text" && node.matches("li,blockquote") && node.querySelector("p,li")) return;
      tracked.add(node);
      if (node.querySelector(".reveal-word")) {
        // Word-by-word headings keep their own per-word animation.
        node.classList.add("reveal-pending");
      } else {
        node.classList.add("rv", "rv-" + kind);
        // Anything that holds or sits inside a link or button only fades, so it never moves under the pointer.
        if (node.querySelector(INTERACTIVE) || node.closest("a,button,summary")) node.classList.add("rv-calm");
      }
      observer.observe(node);
    }

    function scan() {
      frame = 0;
      root.querySelectorAll(`main :is(${HEADINGS},${TEXT},${BLOCKS}), footer :is(${HEADINGS},p)`).forEach(prepare);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(scan);
    }

    scan();
    const updates = new MutationObserver(schedule);
    updates.observe(root, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      updates.disconnect();
      observer.disconnect();
      tracked.forEach((node) => {
        node.classList.remove("rv", "rv-in", "rv-heading", "rv-text", "rv-block", "rv-image", "rv-calm", "reveal-pending", "has-entered");
        node.style.removeProperty("--rv-delay");
      });
      tracked.clear();
    };
  }, [pathname, search]);

  return null;
}
