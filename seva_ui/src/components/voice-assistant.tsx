"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { reply } from "@/lib/chatbot-logic";

export function VoiceAssistant() {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.interimResults = false;
            recog.lang = "en-IN";

            recog.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                console.log("Transcript received:", transcript);
                handleVoiceCommand(transcript);
                setIsListening(false);
            };

            recog.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                if (event.error === "not-allowed") {
                    toast.error("Microphone access denied. Please enable it in your browser settings to use voice features.");
                } else if (event.error === "no-speech") {
                    // Silence usually happens if user doesn't say anything, just reset
                } else {
                    toast.error("Voice error: " + (event.error || "Unknown"));
                }
            };

            recog.onend = () => {
                setIsListening(false);
            };

            setRecognition(recog);
        } else {
            console.error("Speech Recognition API not supported in this browser.");
            toast.error("Voice features not supported in this browser. Try Chrome/Edge.");
        }
    }, []);

    const speak = (text: string) => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const router = useRouter();

    const handleVoiceCommand = (command: string) => {
        console.log("Voice Command:", command);
        const response = reply(command);

        if (response && response.text) {
            speak(response.text);
        } else {
            console.error("Invalid response from chatbot logic", response);
        }

        // Auto-navigate if command present
        if (response.links && response.links.length > 0) {
            const link = response.links[0];
            toast("Navigating to: " + link.label);
            setTimeout(() => {
                router.push(link.href);
            }, 800);
        }
    };

    const toggleListening = () => {
        if (!recognition) {
            toast.error("Voice recognition not supported in this browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            setIsListening(true);
            recognition.start();
            toast.info("Listening...");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleListening}
                className={isListening ? "text-red-500 animate-pulse bg-white/10" : "text-white hover:bg-white/10"}
                title="Voice Assistant"
            >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            {isSpeaking && <Volume2 className="h-4 w-4 text-gold-400 animate-bounce" />}
        </div>
    );
}
