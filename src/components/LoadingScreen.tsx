'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Smartphone, Globe, Database } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [windowHeight, setWindowHeight] = useState(800)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-orange-900/20"></div>
      
      {/* Matrix-style Code Rain */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: windowHeight + 100, 
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute text-blue-400 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 8}px`
            }}
          >
            {['Flutter', 'Dart', 'Firebase', 'BLoC', 'Widget', 'State', 'Mobile', 'App', 'Code', 'Dev'].map((word, j) => (
              <div key={j} className="mb-1">{word}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <Code size={24} className="text-black" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono mb-2 sm:mb-3"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
            NURLIFE
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm sm:text-base text-gray-300 font-mono mb-6 sm:mb-8"
        >
          Mobile & Web Developer
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.7, duration: 1.5, ease: "easeInOut" }}
          className="w-48 sm:w-64 h-1.5 bg-gray-800 rounded-full mx-auto overflow-hidden shadow-lg"
        >
          <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-500 rounded-full shadow-lg"></div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-xs sm:text-sm text-blue-400 font-mono mt-3 sm:mt-4 flex items-center justify-center space-x-2"
        >
          <Zap size={12} className="text-orange-400 animate-pulse" />
          <span>Initializing...</span>
        </motion.p>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 max-w-md sm:max-w-lg mx-auto">
            {[
              { name: 'Flutter', icon: Smartphone, color: 'blue' },
              { name: 'Dart', icon: Code, color: 'cyan' },
              { name: 'Firebase', icon: Database, color: 'orange' },
              { name: 'BLoC', icon: Zap, color: 'blue' },
              { name: 'NextJS', icon: Globe, color: 'cyan' },
              { name: 'TypeScript', icon: Code, color: 'orange' },
              { name: 'NestJS', icon: Database, color: 'blue' },
              { name: 'Mobile', icon: Smartphone, color: 'cyan' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.05, duration: 0.3 }}
                className="px-2 py-1.5 bg-gray-900/80 text-gray-300 rounded-lg text-xs font-mono border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-center space-x-1">
                  <tech.icon size={10} className={`text-${tech.color}-400`} />
                  <span>{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-xs text-gray-400 font-mono"
        >
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span>Ready to Launch</span>
        </motion.div>
      </div>
    </div>
  )
} 