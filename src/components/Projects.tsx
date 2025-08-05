'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitBranch, Eye, Smartphone, Code, Zap, Download, Users } from 'lucide-react'

interface Project {
  name: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  image: string
  features?: string[]
  downloads?: string
  rating?: string
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-20"
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
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-primary px-6 py-3 rounded-full text-white font-mono text-sm mb-6">
            <Smartphone size={20} />
            <span>Mobile App Portfolio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black gradient-text font-display mb-4">
            Projects
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            A showcase of my mobile development projects, featuring Flutter apps, cross-platform solutions, and innovative mobile experiences with real user metrics.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="modern-card h-full flex flex-col hover:shadow-card-heavy transition-all duration-500 overflow-hidden">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-primary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-black gradient-text font-display opacity-30 mb-2">
                        {project.name.split(' ').map(word => word[0]).join('')}
                      </div>
                      <div className="text-xs font-mono text-primary-cyan opacity-60">
                        &lt;MobileApp /&gt;
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-bg-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full bg-primary-cyan text-white hover:bg-primary-magenta transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full bg-primary-cyan text-white hover:bg-primary-magenta transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Project Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-text-light">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-primary-yellow" />
                        <span className="font-mono">{project.rating || "4.8"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download size={14} className="text-primary-cyan" />
                        <span className="font-mono">{project.downloads || "2.1k"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-primary-magenta" />
                        <span className="font-mono">Active</span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="px-3 py-1 bg-primary-green/10 text-primary-green rounded-full text-xs font-medium border border-primary-green/20 font-mono">
                      Live
                    </div>
                  </div>

                  {/* Project Title */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/30">
                      <Code size={16} className="text-primary-cyan" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-cyan font-primary group-hover:text-primary-magenta transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  {/* Project Description */}
                  <p className="text-text-light leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-primary-cyan font-primary mb-2">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-primary-magenta/10 text-primary-magenta rounded text-xs font-mono border border-primary-magenta/20"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="px-2 py-1 bg-primary-yellow/10 text-primary-yellow rounded text-xs font-mono border border-primary-yellow/20">
                            +{project.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-primary-cyan font-primary mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
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
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-primary-yellow/10 text-primary-yellow rounded-full text-sm font-medium border border-primary-yellow/20 font-mono">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary-cyan text-white rounded-lg hover:bg-primary-magenta transition-colors font-medium font-mono"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-primary-cyan text-primary-cyan rounded-lg hover:bg-primary-cyan hover:text-white transition-all duration-300 font-medium font-mono"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
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
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-primary px-8 py-4 rounded-full text-white font-medium hover:shadow-glow-cyan transition-all duration-300"
          >
            <Github size={20} />
            <span>View All Mobile Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
} 