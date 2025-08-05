'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, Hash } from 'lucide-react'

interface Certification {
  name: string
  issuer: string
  year: string
  credential: string
}

interface CertificationsProps {
  certifications: Certification[]
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-cyber-gray/50 backdrop-blur-sm border border-neon-blue/20 rounded-2xl p-8 hover-glow max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center mb-8"
          >
            <div className="p-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink mr-4">
              <Award size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text font-['Orbitron']">
              Certifications
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-cyber-dark/50 rounded-lg p-6 border border-neon-purple/10 hover-glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink">
                    <Award size={20} className="text-white" />
                  </div>
                  <div className="flex items-center text-neon-purple">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm font-medium">{cert.year}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neon-purple font-['Rajdhani'] mb-2">
                  {cert.name}
                </h3>
                
                <p className="text-gray-300 mb-3 font-['Rajdhani']">
                  {cert.issuer}
                </p>
                
                <div className="flex items-center text-gray-400 text-sm">
                  <Hash size={14} className="mr-2" />
                  <span className="font-mono">{cert.credential}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
} 