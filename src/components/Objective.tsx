'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

interface Objective {
  title: string
  content: string
}

interface ObjectiveProps {
  objective: Objective
}

export default function Objective({ objective }: ObjectiveProps) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-cyber-gray/50 backdrop-blur-sm border border-neon-blue/20 rounded-2xl p-8 hover-glow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center mb-6"
        >
          <div className="p-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple mr-4">
            <Target size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text font-['Orbitron']">
            {objective.title}
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg leading-relaxed text-gray-300 font-['Rajdhani']"
        >
          {objective.content}
        </motion.p>
      </div>
    </motion.section>
  )
} 