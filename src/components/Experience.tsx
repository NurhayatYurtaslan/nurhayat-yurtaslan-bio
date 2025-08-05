'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, Building, ExternalLink, Smartphone, Code, Zap, Trophy, TrendingUp } from 'lucide-react'

interface ExperienceItem {
  position: string
  company: string
  period: string
  description: string
  technologies: string[]
  achievements?: string[]
}

interface ExperienceProps {
  experience: ExperienceItem[]
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-background opacity-50"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-primary px-6 py-3 rounded-full text-white font-mono text-sm mb-6">
            <Smartphone size={20} />
            <span>Mobile Development Journey</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black gradient-text font-display mb-4">
            Experience
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            My professional journey in mobile development, specializing in Flutter, cross-platform solutions, and user-centric app development with measurable achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform lg:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 lg:left-1/2 w-4 h-4 bg-primary-cyan rounded-full border-4 border-bg-deep shadow-glow-cyan transform lg:-translate-x-1/2 z-10"></div>
                
                {/* Content Card */}
                <div className={`ml-16 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                  <div className="modern-card group hover:shadow-card-heavy transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/30">
                            <Code size={16} className="text-primary-cyan" />
                          </div>
                          <h3 className="text-2xl font-bold text-primary-cyan font-primary group-hover:text-primary-magenta transition-colors">
                            {item.position}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-text-light mb-3">
                          <div className="flex items-center space-x-2">
                            <Building size={16} className="text-primary-cyan" />
                            <span className="font-medium font-mono">{item.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-primary-cyan" />
                            <span className="text-sm font-mono">{item.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* External Link Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        className="p-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ExternalLink size={16} className="text-primary-cyan" />
                      </motion.div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-text-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Achievements */}
                    {item.achievements && (
                      <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Trophy size={16} className="text-primary-yellow" />
                          <h4 className="text-lg font-bold text-primary-cyan font-primary">
                            Key Achievements
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + achievementIndex * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                              className="flex items-start space-x-2 text-text-light text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-mono">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp size={16} className="text-primary-magenta" />
                        <h4 className="text-lg font-bold text-primary-cyan font-primary">
                          Technologies Used
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + techIndex * 0.1, duration: 0.3 }}
                            viewport={{ once: true }}
                            className="px-3 py-1 bg-primary-cyan/10 text-primary-cyan rounded-full text-sm font-medium border border-primary-cyan/20 hover:bg-primary-cyan hover:text-white transition-all duration-300 font-mono"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-primary px-6 py-3 rounded-full text-white font-mono text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Open to mobile development opportunities</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
} 