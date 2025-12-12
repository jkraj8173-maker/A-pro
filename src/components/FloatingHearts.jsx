"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Heart } from "lucide-react"

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random()
      const heart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 20 + 12,
        duration: Math.random() * 4 + 6,
        delay: Math.random() * 0.5,
        color: ['#f472b6', '#ec4899', '#db2777', '#be185d', '#a855f7', '#c084fc'][Math.floor(Math.random() * 6)]
      }
      setHearts(prev => [...prev, heart])
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id))
      }, (heart.duration + heart.delay) * 1000)
    }

    createHeart()
    const interval = setInterval(createHeart, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: `${heart.left}%`, bottom: -50 }}
            initial={{ y: 0, opacity: 0.8, scale: 0.5, rotate: -15 }}
            animate={{ 
              y: -window.innerHeight - 100,
              opacity: [0.8, 0.9, 0.7, 0.4, 0],
              scale: [0.5, 1, 0.9, 0.8, 0.6],
              rotate: [Math.random() * 30 - 15, Math.random() * 60 - 30, Math.random() * 30 - 15]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut"
            }}
          >
            <Heart 
              size={heart.size} 
              fill={heart.color}
              color={heart.color}
              className="drop-shadow-lg"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
