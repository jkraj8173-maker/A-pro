"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function Sparkles() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const createSparkle = () => {
      const id = Date.now() + Math.random()
      const sparkle = {
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 1.5 + 1,
      }
      setSparkles(prev => [...prev, sparkle])
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id))
      }, sparkle.duration * 1000)
    }

    const interval = setInterval(createSparkle, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{ 
              left: `${sparkle.left}%`, 
              top: `${sparkle.top}%`,
              width: sparkle.size,
              height: sparkle.size
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: sparkle.duration,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path 
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" 
                fill="url(#sparkleGradient)"
              />
              <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9a8d4" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
