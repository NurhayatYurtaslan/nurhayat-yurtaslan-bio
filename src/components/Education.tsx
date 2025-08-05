'use client'

import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Calendar, MapPin, Code, Terminal, Database, Cpu } from 'lucide-react'

interface EducationItem {
  degree: string
  institution: string
  year: string
  description: string
}

interface EducationProps {
  education: EducationItem[]
}

export default function Education({ education }: EducationProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-background opacity-30"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-primary px-6 py-3 rounded-full text-white font-mono text-sm mb-6">
            <GraduationCap size={20} />
            <span>Academic Background</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black gradient-text font-display mb-4">
            Education
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            My academic foundation in Electrical & Electronic Engineering with focus on software development principles.
          </p>
        </motion.div>

        {/* Education Cards - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="modern-card group hover:shadow-card-heavy transition-all duration-500 h-full">
                {/* Header with Developer Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 rounded-full bg-primary-cyan/10 border border-primary-cyan/30">
                      <BookOpen size={24} className="text-primary-cyan" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-cyan font-primary group-hover:text-primary-blue transition-colors mb-2">
                        {item.degree}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-text-light mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-primary-cyan" />
                          <span className="font-medium font-mono text-sm">{item.institution}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-primary-cyan" />
                          <span className="text-xs font-mono">{item.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Developer Badge */}
                  <div className="px-3 py-1 bg-primary-blue/10 border border-primary-blue/30 rounded-full">
                    <span className="text-xs font-mono text-primary-blue">ENGINEER</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-text-light leading-relaxed text-sm mb-6">
                  {item.description}
                </p>

                {/* Code Snippet */}
                <div className="mb-6 p-4 bg-bg-dark rounded-lg border border-primary-cyan/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Terminal size={14} className="text-primary-cyan" />
                    <span className="text-xs font-mono text-primary-cyan">education.js</span>
                  </div>
                  <pre className="text-xs font-mono text-text-light overflow-x-auto">
                    <code>
{`const {degree} = {
  institution: "${item.institution}",
  year: "${item.year}",
  focus: "Software Engineering",
  status: "completed"
};`}
                    </code>
                  </pre>
                </div>

                {/* Skills Developed */}
                <div className="border-t border-primary-cyan/20 pt-4">
                  <h4 className="text-sm font-bold text-primary-cyan font-primary mb-3 flex items-center space-x-2">
                    <Cpu size={14} />
                    <span>Skills Developed</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {index === 0 ? (
                      // Master's degree skills
                      ['Mobile Development', 'Embedded Systems', 'IoT Technologies', 'Real-time Systems', 'Research Methods'].map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-primary-blue/10 text-primary-blue rounded text-xs font-mono border border-primary-blue/20">
                          {skill}
                        </span>
                      ))
                    ) : (
                      // Bachelor's degree skills
                      ['Programming', 'Software Engineering', 'Data Structures', 'Digital Systems', 'Microcontrollers'].map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-primary-green/10 text-primary-green rounded text-xs font-mono border border-primary-green/20">
                          {skill}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Tech Stack Preview */}
                <div className="mt-4 pt-4 border-t border-primary-cyan/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database size={14} className="text-primary-cyan" />
                    <span className="text-xs font-mono text-primary-cyan">Tech Stack</span>
                  </div>
                  <div className="flex space-x-2">
                    {index === 0 ? (
                      <>
                        <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-primary px-6 py-3 rounded-full text-white font-mono text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Continuously learning and growing</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
} 