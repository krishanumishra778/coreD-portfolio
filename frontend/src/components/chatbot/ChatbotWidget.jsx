import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

import { ChatbotWindow } from "./ChatbotWindow.jsx";
import { assistantCopy } from "../../data/KnowledgeBase.js";


const CHAT_PANEL_ID = "cored-chat-panel";


const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The panel covers the whole screen, so Tab must not wander into the page behind it.
function keepFocusInside(event, container) {
  if (!container) return;

  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

  if (focusable.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!container.contains(active) || active === container) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function ChatbotWidget({ classic = false }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const launcherButtonRef = useRef(null);
  const panelRef = useRef(null);
  const hasOpenedChatRef = useRef(false);

  useEffect(() => {
    if (!isChatOpen) return undefined;

    hasOpenedChatRef.current = true;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsChatOpen(false);
      } else if (event.key === "Tab") {
        keepFocusInside(event, panelRef.current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (!isChatOpen && hasOpenedChatRef.current) {
      launcherButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isChatOpen]);

  function handleOpenChat() {
    setIsChatOpen(true);
  }

  function handleCloseChat() {
    setIsChatOpen(false);
  }

  return (
    <>
      {isChatOpen ? (
        <div
          ref={panelRef}
          id={CHAT_PANEL_ID}
          className={classic ? "chat-panel classic-chat-panel" : "chat-panel"}
          role="dialog"
          aria-label={assistantCopy.chatLabel}
          aria-modal="true"
          tabIndex={-1}
          onClick={(event) => { if (event.target === event.currentTarget) handleCloseChat(); }}
        >
          <ChatbotWindow onClose={handleCloseChat} />
        </div>
      ) : (
        <button
          ref={launcherButtonRef}
          type="button"
          className={classic ? "classic-chat-launcher" : "icon-button chat-launcher"}
          onClick={handleOpenChat}
          aria-label="Open CoreD chat assistant"
          aria-haspopup="dialog"
          title="Open CoreD chat assistant"
        >
          {classic
            ? <img src="/Images/Chatbot.png" alt="" width="76" height="76" decoding="async" />
            : <MessageCircle size={20} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
