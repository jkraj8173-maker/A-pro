"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Heart, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export default function BalloonsScreen({ onNext }) {
  const [burstedBalloons, setBurstedBalloons] = useState([])
  const [floatingTexts, setFloatingTexts] = useState([])
  const [balloonsReady, setBalloonsReady] = useState(false)
  const [showContinue, setShowContinue] = useState(false)

  const balloons = [
    { id: 1, text: "I", color: "from-pink-300 via-pink-400 to-pink-500", emoji: "💗", x: -140 },
    { id: 2, text: "Love", color: "from-rose-300 via-rose-400 to-rose-500", emoji: "💕", x: -47 },
    { id: 3, text: "You", color: "from-purple-300 via-purple-400 to-purple-500", emoji: "💜", x: 47 },
    { id: 4, text: "bubu", color: "from-fuchsia-300 via-fuchsia-400 to-fuchsia-500", emoji: "🐻", x: 140 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setBalloonsReady(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (burstedBalloons.length === 4) {
      setTimeout(() => setShowContinue(true), 1500)
    }
  }, [burstedBalloons])

  const handleBalloonClick = (balloon) => {
    if (!balloonsReady || burstedBalloons.includes(balloon.id)) return
    
    setBurstedBalloons(prev => [...prev, balloon.id])
    setFloatingTexts(prev => [...prev, balloon])
    
    const xOrigin = 0.5 + (balloon.x / window.innerWidth)
    
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { x: Math.max(0.2, Math.min(0.8, xOrigin)), y: 0.5 },
      colors: ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffc0cb', '#dda0dd']
    })
  }

  const BalloonComponent = ({ balloon, index }) => {
    const isBursted = burstedBalloons.includes(balloon.id)
    
    return (
      <AnimatePresence>
        {!isBursted && (
          <motion.div
            className="relative cursor-pointer"
            initial={{ y: 200, scale: 0, opacity: 0 }}
            animate={{
              y: 0,
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: [1.3, 0],
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            transition={{
              y: { delay: 0.8 + index * 0.3, duration: 1.2, ease: "easeOut" },
              scale: { delay: 0.5 + index * 0.3, duration: 1, ease: "backOut" },
              opacity: { delay: 0.5 + index * 0.3, duration: 0.8 },
            }}
            onClick={() => handleBalloonClick(balloon)}
          >
            <motion.div
              className="relative"
              animate={{
                y: [-6, 6, -6],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 2.5 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className={`absolute inset-0 w-28 h-36 md:w-32 md:h-40 rounded-full bg-gradient-to-b ${balloon.color} blur-xl opacity-40`} />
              
              <motion.div
                className={`relative w-28 h-36 md:w-32 md:h-40 rounded-full bg-gradient-to-b ${balloon.color} flex items-center justify-center shadow-xl`}
                style={{
                  borderRadius: "50% 50% 50% 50% / 55% 55% 45% 45%",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(236, 72, 153, 0.3)",
                    "0 0 30px rgba(236, 72, 153, 0.5)",
                    "0 0 15px rgba(236, 72, 153, 0.3)",
                  ]
                }}
                transition={{
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="absolute top-4 left-5 w-6 h-10 bg-white/40 rounded-full blur-sm transform -rotate-12" />
                <div className="absolute top-7 left-8 w-2 h-4 bg-white/60 rounded-full blur-sm transform -rotate-12" />
                
                <div className="flex flex-col items-center gap-1">
                  <motion.span
                    className="text-xl md:text-2xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {balloon.emoji}
                  </motion.span>
                  <motion.span 
                    className="text-white font-bold text-2xl md:text-3xl z-10 drop-shadow-md"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                  >
                    {balloon.text}
                  </motion.span>
                </div>
              </motion.div>

              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <div className={`w-3 h-3 bg-gradient-to-b ${balloon.color} rounded-full shadow-md`} />
              </div>

              <svg
                className="absolute top-full left-1/2 -translate-x-1/2"
                width="16"
                height="80"
                viewBox="0 0 16 80"
              >
                <motion.path
                  d="M8 0 Q 12 20, 8 40 T 8 80"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  animate={{
                    d: [
                      "M8 0 Q 12 20, 8 40 T 8 80",
                      "M8 0 Q 4 20, 8 40 T 8 80",
                      "M8 0 Q 12 20, 8 40 T 8 80",
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>

              {balloonsReady && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-lg">✨</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const FloatingText = ({ balloon, index }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%' }}
      initial={{ x: balloon.x - 30, y: 0, opacity: 0, scale: 0 }}
      animate={{ 
        x: balloon.x - 30,
        y: -180 - index * 20,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.8],
      }}
      transition={{ 
        duration: 2.5,
        ease: "easeOut"
      }}
    >
      <motion.div className="flex items-center gap-2">
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          {balloon.text}
        </span>
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          {balloon.emoji}
        </motion.span>
      </motion.div>
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${-20 + i * 20}px`,
            top: `${10 + i * 5}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            y: -50 - Math.random() * 30,
            x: (Math.random() - 0.5) * 40,
          }}
          transition={{ 
            duration: 1.5,
            delay: 0.2 + i * 0.1,
            ease: "easeOut"
          }}
        >
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
        </motion.div>
      ))}
    </motion.div>
  )

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center max-w-2xl mx-auto mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-3xl md:text-5xl text-pink-200 leading-tight font-semibold">
          This is what I want to say <span className="text-pink-400 font-bold">so long...</span>
        </h1>
        <motion.p
          className="text-pink-300/80 text-lg mt-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {burstedBalloons.length < 4 
            ? `Tap each balloon to reveal my message 💕 (${burstedBalloons.length}/4)`
            : "I Love You bubu 💕"
          }
        </motion.p>
      </motion.div>

      <div className="relative flex items-end justify-center gap-2 md:gap-4 py-8" style={{ minHeight: "280px" }}>
        {balloons.map((balloon, index) => (
          <BalloonComponent key={balloon.id} balloon={balloon} index={index} />
        ))}
        
        {floatingTexts.map((balloon, index) => (
          <FloatingText key={`float-${balloon.id}`} balloon={balloon} index={index} />
        ))}
      </div>

      <AnimatePresence>
        {showContinue && (
          <motion.div
            className="text-center mt-6 flex flex-col items-center"
            initial={{ y: 50, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <motion.div
              className="mb-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              I Love You bubu 💕
            </motion.div>
            
            <motion.p
              className="text-pink-300/80 text-sm mb-6 flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
              There's more I want to show you...
              <Sparkles className="w-4 h-4" />
            </motion.p>

            <motion.button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 mr-2 fill-current animate-pulse" />
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
