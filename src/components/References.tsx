'use client'

import { motion } from 'framer-motion'
import { Users, Mail, Phone, Building } from 'lucide-react'

interface Reference {
  name: string
  position: string
  company: string
  email: string
  phone: string
}

interface ReferencesProps {
  references: Reference[]
}

export default function References({ references }: ReferencesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
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
          className="flex items-center mb-8"
        >
          <div className="p-3 rounded-full bg-gradient-to-r from-accent to-neon-purple mr-4">
            <Users size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text font-['Orbitron']">
            References
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-cyber-dark/50 rounded-lg p-6 border border-accent/10 hover-glow"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent to-neon-purple flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-white">
                    {ref.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-accent font-['Rajdhani']">
                  {ref.name}
                </h3>
                <p className="text-gray-300 text-sm font-['Rajdhani']">
                  {ref.position}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <Building size={14} className="mr-2 text-accent" />
                  <span>{ref.company}</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Mail size={14} className="mr-2 text-accent" />
                  <span>{ref.email}</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Phone size={14} className="mr-2 text-accent" />
                  <span>{ref.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
} 