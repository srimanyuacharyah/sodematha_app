"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ── Types ── */
interface ChatMsg {
    id: string;
    role: "user" | "bot";
    text: string;
    links?: { label: string; href: string }[];
}

import { isKn, reply, ChatResponse } from "@/lib/chatbot-logic";

/* ── Logic Moved to @/lib/chatbot-logic ── */

/* ── Component ── */
export function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState<ChatMsg[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [lang, setLang] = useState<"en" | "kn">("en");
    const [mounted, setMounted] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
    useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

    useEffect(() => {
        if (open && msgs.length === 0) {
            setMsgs([{
                id: "w", role: "bot",
                text: lang === "kn"
                    ? "🙏 ನಮಸ್ಕಾರ! ಸೇವಾ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ.\nಕನ್ನಡ/English ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ!"
                    : "🙏 Namaste! Welcome to Seva Sahayak.\nType in English or ಕನ್ನಡ, or tap a button below!",
            }]);
        }
    }, [open, msgs.length, lang]);

    function send(text?: string) {
        const t = text || input.trim();
        if (!t) return;
        const detected = isKn(t) ? "kn" : "en";
        setLang(detected);
        setMsgs(p => [...p, { id: Date.now() + "", role: "user", text: t }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            const r = reply(t);
            setMsgs(p => [...p, {
                id: Date.now() + "b",
                role: "bot",
                text: r?.text || "🙏 Namaste. I am currently focusing on my prayers. Please try again in a moment.",
                links: r?.links
            }]);
            setTyping(false);
        }, 600);
    }

    if (!mounted) return null;

    const quicksEn = ["🛕 Sevas", "🕐 Timings", "📖 History", "💰 Prices", "🙏 Donate"];
    const quicksKn = ["🛕 ಸೇವೆ", "🕐 ಸಮಯ", "📖 ಇತಿಹಾಸ", "💰 ಬೆಲೆ", "🙏 ಕಾಣಿಕೆ"];
    const quicks = lang === "kn" ? quicksKn : quicksEn;

    return (
        <div id="seva-chatbot-root">
            {/* FAB */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed", bottom: 24, right: 24, zIndex: 99999,
                    width: 64, height: 64, borderRadius: "50%",
                    background: open ? "#2D0000" : "linear-gradient(135deg, #D4AF37, #B8860B)",
                    boxShadow: "0 8px 32px rgba(212,175,55,0.5)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.2s, background 0.3s",
                    userSelect: "none",
                }}
                role="button"
                tabIndex={0}
                aria-label="Toggle Chatbot"
            >
                {open ? (
                    <span style={{ color: "#fff", fontSize: 28, fontWeight: 300, lineHeight: 1 }}>✕</span>
                ) : (
                    <span style={{ fontSize: 28, lineHeight: 1 }}>💬</span>
                )}
            </div>

            {/* Chat Window */}
            {open && (
                <div style={{
                    position: "fixed", bottom: 100, right: 24, zIndex: 99998,
                    width: 370, maxWidth: "calc(100vw - 2rem)",
                    height: 520, maxHeight: "calc(100vh - 8rem)",
                    borderRadius: 20, overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    background: "linear-gradient(180deg, #1A0000 0%, #0a0000 100%)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.2)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "14px 18px", display: "flex", alignItems: "center", gap: 10,
                        borderBottom: "1px solid rgba(212,175,55,0.25)",
                        background: "linear-gradient(135deg, #2D0000, #1A0000)",
                    }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: "50%",
                            background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20,
                        }}>🙏</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Seva Sahayak</div>
                            <div style={{ color: "#D4AF37", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
                                {lang === "kn" ? "ಸೇವಾ ಸಹಾಯಕ • ಆನ್‌ಲೈನ್" : "Online • Ask anything"}
                            </div>
                        </div>
                        <div
                            onClick={(e) => { e.stopPropagation(); setLang(lang === "en" ? "kn" : "en"); }}
                            style={{
                                padding: "5px 10px", fontSize: 11, fontWeight: 700,
                                borderRadius: 20, border: "1px solid rgba(212,175,55,0.3)",
                                color: "#D4AF37", cursor: "pointer",
                            }}
                        >{lang === "en" ? "ಕನ್ನಡ" : "EN"}</div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1, overflowY: "auto", padding: 14,
                        display: "flex", flexDirection: "column", gap: 12,
                    }}>
                        {msgs.map(m => (
                            <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                                <div style={{ maxWidth: "85%" }}>
                                    {m.role === "bot" && (
                                        <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 700, marginBottom: 3, letterSpacing: 1 }}>
                                            ✨ Seva Sahayak
                                        </div>
                                    )}
                                    <div style={{
                                        borderRadius: m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                                        padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
                                        whiteSpace: "pre-line",
                                        background: m.role === "user" ? "#D4AF37" : "rgba(255,255,255,0.06)",
                                        color: m.role === "user" ? "#1A0000" : "rgba(255,255,255,0.9)",
                                        fontWeight: m.role === "user" ? 600 : 400,
                                        border: m.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                                    }}>
                                        {m.text}
                                    </div>
                                    {m.links && m.links.length > 0 && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
                                            {m.links.map((l, i) => (
                                                <Link key={i} href={l.href} style={{
                                                    display: "inline-block", padding: "5px 10px", fontSize: 11, fontWeight: 700,
                                                    color: "#D4AF37", background: "rgba(212,175,55,0.1)",
                                                    border: "1px solid rgba(212,175,55,0.2)",
                                                    borderRadius: 16, textDecoration: "none",
                                                }}>
                                                    {l.label} →
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <div style={{
                                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "14px 14px 14px 3px", padding: "10px 14px",
                                    color: "#D4AF37", fontSize: 20, letterSpacing: 4,
                                }}>...</div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Quick Actions */}
                    {msgs.length <= 1 && (
                        <div style={{ padding: "0 14px 8px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {quicks.map((q, i) => (
                                <div key={i} onClick={() => send(q.replace(/^[^\s]+\s/, ""))} style={{
                                    padding: "5px 10px", fontSize: 11, fontWeight: 600,
                                    color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16,
                                    cursor: "pointer",
                                }}>{q}</div>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: "10px 14px",
                        borderTop: "1px solid rgba(212,175,55,0.25)",
                        background: "linear-gradient(135deg, #2D0000, #1A0000)",
                        display: "flex", gap: 8, alignItems: "center",
                    }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") send(); }}
                            placeholder={lang === "kn" ? "ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." : "Type your message..."}
                            style={{
                                flex: 1, background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 20, padding: "9px 14px", fontSize: 13,
                                color: "#fff", outline: "none",
                            }}
                        />
                        <div
                            onClick={() => send()}
                            style={{
                                width: 38, height: 38, borderRadius: "50%",
                                background: input.trim() ? "#D4AF37" : "rgba(212,175,55,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: input.trim() ? "pointer" : "default",
                                fontSize: 16, color: "#1A0000",
                            }}
                        >▶</div>
                    </div>
                </div>
            )}
        </div>
    );
}
