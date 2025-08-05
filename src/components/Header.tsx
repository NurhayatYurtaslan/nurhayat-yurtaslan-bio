'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Download, Smartphone, Code, Zap, ExternalLink } from 'lucide-react'

interface SocialMedia {
  name: string
  url: string
  icon: string
  color: string
}

interface Personal {
  name: string
  title: string
  email: string
  location: string
  bio: string
}

interface HeaderProps {
  personal: Personal
  socialMedia: SocialMedia[]
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
}

export default function Header({ personal, socialMedia }: HeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Code Background */}
      <div className="absolute inset-0 bg-gradient-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 text-primary-cyan font-mono text-xs">
            <span className="text-primary-magenta">class</span> MobileDeveloper {'{'}
          </div>
          <div className="absolute top-20 sm:top-32 left-8 sm:left-16 text-primary-cyan font-mono text-xs">
            <span className="text-primary-yellow">String</span> name = <span className="text-primary-green">"{personal.name}"</span>;
          </div>
          <div className="absolute top-30 sm:top-44 left-8 sm:left-16 text-primary-cyan font-mono text-xs">
            <span className="text-primary-yellow">String</span> role = <span className="text-primary-green">"{personal.title}"</span>;
          </div>
          <div className="absolute top-40 sm:top-56 left-8 sm:left-16 text-primary-cyan font-mono text-xs">
            <span className="text-primary-yellow">List&lt;String&gt;</span> skills = [<span className="text-primary-green">"Flutter"</span>, <span className="text-primary-green">"Dart"</span>, <span className="text-primary-green">"Mobile"</span>];
          </div>
          <div className="absolute top-50 sm:top-68 left-4 sm:left-10 text-primary-cyan font-mono text-xs">
            {'}'}
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 text-primary-cyan font-mono text-xs opacity-30 hidden sm:block"
        >
          &lt;Widget&gt;
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-3/4 left-1/4 text-primary-magenta font-mono text-xs opacity-30 hidden sm:block"
        >
          Firebase
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15], x: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 text-primary-yellow font-mono text-xs opacity-30 hidden sm:block"
        >
          BLoC
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], x: [15, -15, 15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 text-primary-green font-mono text-xs opacity-30 hidden sm:block"
        >
          Widget
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center lg:text-left w-full max-w-2xl"
          >
            {/* Developer Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              <Code size={16} />
              <span>{personal.title}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white font-mono leading-tight mb-4 sm:mb-6"
            >
              {personal.name.split(' ').map((word, index) => (
                <span key={index} className="block">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                </span>
              ))}
            </motion.h1>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {personal.bio}
            </motion.p>

            {/* Tech Stack Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              {['Flutter', 'Dart', 'Firebase', 'BLoC', 'NextJS', 'TypeScript', 'NestJS'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg text-sm font-mono border border-gray-700 hover:border-blue-500/50 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail size={18} className="text-orange-400" />
                <a 
                  href={`mailto:${personal.email}`}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base"
                >
                  {personal.email}
                </a>
                <ExternalLink size={14} className="text-gray-500" />
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MapPin size={18} className="text-orange-400" />
                <span className="text-gray-300 text-sm sm:text-base">{personal.location}</span>
              </div>
            </motion.div>

            {/* Developer Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-sm mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">15+</div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">3+</div>
                <div className="text-xs sm:text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">100%</div>
                <div className="text-xs sm:text-sm text-gray-400">Mobile</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Avatar & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center lg:items-end space-y-6 sm:space-y-8"
          >
            {/* Code-like Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-500 via-cyan-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 relative overflow-hidden">
                <div className="text-center text-black font-mono font-bold text-lg sm:text-xl lg:text-2xl">
                  <div>&lt;MobileDev /&gt;</div>
                </div>
                
                {/* Floating Code Elements around Avatar */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {['{}', '()', '[]'].map((symbol, index) => (
                    <motion.div
                      key={symbol}
                      animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 3 + index,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="absolute text-blue-400 font-mono text-sm sm:text-base"
                      style={{
                        left: `${20 + index * 30}%`,
                        top: `${30 + index * 20}%`
                      }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4"
            >
              {socialMedia.map((social, index) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-orange-500/50 rounded-full flex items-center justify-center transition-all duration-300 group"
                  >
                    <IconComponent 
                      size={20} 
                      className={`text-${social.color}-400 group-hover:text-orange-400 transition-colors`} 
                    />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 