import React from "react";
import { useLoadingStore } from "../../config/zustand";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";

const getLottieOptions = (src: string) => ({
  src,
  loop: true,
  autoplay: true,
  style: { width: "80px", height: "80px" },
  className: "w-full h-full",
});

const PMS_LOTTIE = "https://lottie.host/56dcf58a-134b-4677-81dd-3f52a60878a9/Banf4GFCWC.lottie";

interface LoadingScreenProps {
  text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text }) => {
  const { loading } = useLoadingStore();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center h-screen overflow-hidden backdrop-blur-lg bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 via-white to-orange-100/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DotLottieReact {...getLottieOptions(PMS_LOTTIE)} />
            <motion.p
              className="mt-4 text-blue-900 text-lg font-bold tracking-wide text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {text || "Loading, please wait..."}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 