"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
                handleVoiceCommand(transcript);
                setIsListening(false);
            };

            recog.onerror = () => {
                setIsListening(false);
                toast.error("Voice recognition error.");
            };

            recog.onend = () => {
                setIsListening(false);
            };

            setRecognition(recog);
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

    const handleVoiceCommand = (command: string) => {
        console.log("Voice Command:", command);
        if (command.includes("hello") || command.includes("namaste")) {
            speak("Namaste! Welcome to Sri Sode Vadiraja Matha. How can I assist you today?");
        } else if (command.includes("seva") || command.includes("book")) {
            speak("You can book various sevas in the Sevas section. Would you like me to take you there?");
        } else if (command.includes("history") || command.includes("about")) {
            speak("Sri Sode Vadiraja Matha was established by Sri Madhvacharya and flourished under Sri Vadiraja Teertha.");
        } else {
            speak("I heard: " + command + ". I am learning to serve you better.");
        }
        toast("Voiced: " + command);
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
