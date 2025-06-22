import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Target } from "lucide-react";
import Header from "../../../layouts/Header";

const TYPING_SPEED = 50;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 1000;
const WORDS = [
  "Streamline Your Project Grading",
  "Excel in Course Management",
];

const Hero: React.FC = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setCharIndex(0);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Header />
    <section
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-orange-100 overflow-hidden"
      id="hero"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center pt-32 md:pt-0 px-4 md:px-12">
        {/* Left: Text */}
        <div className="flex flex-col gap-6 z-10 md:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow w-max"
          >
            <Star className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-600">Start Grading Now</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              PMS <span className="text-orange-500">|</span> <span className="text-orange-500">GR-VI</span>
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mt-2">
            Welcome to PMS — The <span className="text-gray-900">{text}<span className="inline-block w-1 h-6 bg-orange-400 ml-1 animate-pulse"></span></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-xl">
            Simplify grading for Project Management courses with tools to manage scores, track progress, and generate insightful reports.
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-200/50 w-max"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
        {/* Right: Clock Illustration */}
        <div className="flex justify-center items-center relative md:pl-12">
          {/* Simple SVG Clock */}
          <svg width="320" height="320" viewBox="0 0 260 260" fill="none" className="drop-shadow-lg">
            <circle cx="130" cy="130" r="120" fill="#fff" stroke="#FBBF24" strokeWidth="8"/>
            <circle cx="130" cy="130" r="110" fill="url(#clockGradient)" />
            <rect x="124" y="60" width="12" height="80" rx="6" fill="#F59E42" transform="rotate(20 130 130)" />
            <rect x="124" y="130" width="12" height="70" rx="6" fill="#FBBF24" transform="rotate(45 130 130)" />
            <circle cx="130" cy="130" r="10" fill="#F59E42" />
            <defs>
              <radialGradient id="clockGradient" cx="0" cy="0" r="1" gradientTransform="translate(130 130) scale(110)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF7ED" />
                <stop offset="1" stopColor="#FDE68A" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gray-300 opacity-30"
            style={{
              left: `${50 + 40 * Math.cos((i / 12) * 2 * Math.PI)}%`,
              top: `${50 + 40 * Math.sin((i / 12) * 2 * Math.PI)}%`,
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </div>
    </section>
    </>
  );
};

export default Hero;