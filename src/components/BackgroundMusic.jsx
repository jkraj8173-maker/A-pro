"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
      setShowPrompt(false)
    }
  }

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      setShowPrompt(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/bg.mp3" loop />
      
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={startMusic}
            className="bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform shadow-lg border border-white/20"
          >
            <Volume2 size={18} />
            Tap for music
          </button>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors border border-white/20"
      >
        {isPlaying ? (
          <Volume2 size={20} className="text-pink-300" />
        ) : (
          <VolumeX size={20} className="text-pink-300/50" />
        )}
      </motion.button>
    </>
  )
}
