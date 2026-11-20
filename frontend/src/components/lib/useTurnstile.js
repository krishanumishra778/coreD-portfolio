import { useEffect, useRef, useState } from "react";

export const contactProtection = import.meta.env.VITE_CONTACT_SPAM_PROTECTION === "formshield" ? "formshield" : "turnstile";
export const turnstileRequired = contactProtection === "turnstile";
const turnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const turnstileScript = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function useTurnstile() {
  const container = useRef(null);
  const widget = useRef(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(!turnstileRequired ? "" : turnstileKey ? "Loading verification…" : "Verification isn’t configured here. You can email CoreD instead.");

  useEffect(() => {
    if (!turnstileRequired || !turnstileKey) return;
    let disposed = false;
    const render = () => {
      if (disposed || !container.current || !window.turnstile || widget.current != null) return;
      try {
        widget.current = window.turnstile.render(container.current, {
          sitekey: turnstileKey, theme: "light", size: "flexible",
          callback: (value) => { setToken(value); setMessage(""); },
          "expired-callback": () => { setToken(""); setMessage("Verification expired. Please verify again."); },
          "error-callback": () => { setToken(""); setMessage("Verification failed. Please try again or email CoreD."); },
          "timeout-callback": () => { setToken(""); setMessage("Verification timed out. Please try again."); },
        });
        setMessage("");
      } catch { setMessage("Verification could not load. Please refresh or email CoreD."); }
    };
    const error = () => { if (!disposed) setMessage("Verification could not load. Please refresh or email CoreD."); };
    let script = document.querySelector("script[data-cored-turnstile]");
    if (window.turnstile) render();
    else {
      const addScript = !script;
      if (!script) {
        script = document.createElement("script");
        script.src = turnstileScript;
        script.async = true;
        script.dataset.coredTurnstile = "true";
      }
      script.addEventListener("load", render);
      script.addEventListener("error", error);
      if (addScript) document.head.append(script);
    }
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", error);
      if (widget.current != null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  function reset() {
    setToken("");
    if (widget.current != null) window.turnstile?.reset(widget.current);
  }
  return { container, token, message, reset };
}

