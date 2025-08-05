'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code, Zap, Smartphone, Database, Globe, Terminal, GitBranch, Layers, Users, Monitor } from 'lucide-react'
import { 
  SiDart, 
  SiFlutter, 
  SiFirebase, 
  SiSwift, 
  SiTypescript, 
  SiNextdotjs, 
  SiNestjs,
  SiGraphql,
  SiAndroidstudio,
  SiXcode,
  SiFigma,
  SiGithub,
  SiLinux,
  SiApple,
  SiHive,
  SiStrapi,
  SiCodesignal,
  SiUikit,
  SiVsco,
  SiAndroid,
  SiIos,
  SiGit,
  SiNpm,
  SiYarn,
  SiDocker,
  SiKubernetes,
  SiAew,
  SiGooglecloud,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiJira,
  SiSlack,
  SiTrello,
  SiNotion,
  SiConfluence
} from 'react-icons/si'
import { 
  FaMobile, 
  FaDatabase, 
  FaBell, 
  FaCode, 
  FaLaptopCode,
  FaUsers,
  FaServer,
  FaMobileAlt,
  FaGlobe,
  FaGit,
  FaWindows,
  FaCloud,
  FaLock,
  FaShieldAlt,
  FaRocket,
  FaLightbulb,
  FaCogs,
  FaNetworkWired,
  FaDesktop,
  FaTabletAlt,
  FaLaptop,
  FaMobile as FaPhone,
  FaChartBar,
  FaSearch
} from 'react-icons/fa'
import { 
  VscCode,
  VscTerminal,
  VscDebug,
  VscExtensions,
  VscSettings,
  VscAccount,
  VscProject,
  VscFiles,
  VscSearch,
  VscSourceControl
} from 'react-icons/vsc'
import logger from '../utils/logger'

interface SkillsProps {
  mobileDevelopment: string[]
  backendServices: string[]
  webDevelopment: string[]
  developmentTools: string[]
  versionControl: string[]
  architecture: string[]
}

export default function Skills({ 
  mobileDevelopment, 
  backendServices, 
  webDevelopment, 
  developmentTools, 
  versionControl, 
  architecture
}: SkillsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const getSkillIcon = (skill: string) => {
    const iconMap: { [key: string]: any } = {
      // Mobile Development
      'Dart': SiDart,
      'Flutter': SiFlutter,
      'Swift': SiSwift,
      'UIKit': SiUikit,
      'SwiftUI': SiSwift,
      'Android Development': SiAndroid,
      'iOS Development': SiIos,
      
      // Backend Services
      'Firebase': SiFirebase,
      'REST API': FaServer,
      'GraphQL': SiGraphql,
      
      // State Management
      'BLoC': FaCode,
      
      // Web Development
      'NextJS': SiNextdotjs,
      'TypeScript': SiTypescript,
      'NestJS': SiNestjs,
      'JavaScript': FaCode,
      
      // Development Tools
      'Android Studio': SiAndroidstudio,
      'Xcode': SiXcode,
      'Visual Studio Code': VscCode,
      'Figma': SiFigma,
      
      // Version Control
      'Git': SiGit,
      'GitHub': SiGithub,
      
      // Architecture
      'OOP-SOLID Principles': FaCode,
      'Repository Pattern': FaCode,
      'Viper Architecture': FaCode,
      
      // Methodologies
      'Agile/Scrum': FaUsers,
      
      // Platforms
      'Android': SiAndroid,
      'iOS': SiIos,
      'Linux': SiLinux,
      'macOS': SiApple,
      'Windows': FaWindows,
    }
    
    return iconMap[skill] || FaCode
  }

  const getIconColor = (skill: string) => {
    const colorMap: { [key: string]: string } = {
      'Dart': 'blue',
      'Flutter': 'cyan',
      'Swift': 'orange',
      'UIKit': 'orange',
      'SwiftUI': 'orange',
      'Android Development': 'green',
      'iOS Development': 'blue',
      'Firebase': 'orange',
      'REST API': 'blue',
      'GraphQL': 'pink',
      'BLoC': 'blue',
      'NextJS': 'black',
      'TypeScript': 'blue',
      'NestJS': 'red',
      'JavaScript': 'yellow',
      'Android Studio': 'green',
      'Xcode': 'blue',
      'Visual Studio Code': 'blue',
      'Figma': 'pink',
      'Git': 'orange',
      'GitHub': 'black',
      'OOP-SOLID Principles': 'cyan',
      'Repository Pattern': 'blue',
      'Viper Architecture': 'orange',
      'Agile/Scrum': 'green',
      'Android': 'green',
      'iOS': 'blue',
      'Linux': 'orange',
      'macOS': 'gray',
      'Windows': 'blue',
    }
    
    return colorMap[skill] || 'gray'
  }

  const skillCategories = [
    {
      title: 'Mobile',
      description: 'Cross-platform & Native',
      icon: Smartphone,
      color: 'blue',
      skills: mobileDevelopment
    },
    {
      title: 'Backend',
      description: 'Services & APIs',
      icon: Database,
      color: 'orange',
      skills: backendServices
    },
    {
      title: 'Web',
      description: 'Frontend & Backend',
      icon: Globe,
      color: 'cyan',
      skills: webDevelopment
    },
    {
      title: 'Tools',
      description: 'Development',
      icon: Terminal,
      color: 'green',
      skills: developmentTools
    },
    {
      title: 'Git',
      description: 'Version Control',
      icon: GitBranch,
      color: 'orange',
      skills: versionControl
    },
    {
      title: 'Architecture',
      description: 'Patterns & Principles',
      icon: Layers,
      color: 'purple',
      skills: architecture
    }
  ]

  const handleSkillClick = (skill: string) => {
    logger.info(`Skill clicked: ${skill}`)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono mb-4">
            Skills & <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Mastered technologies and frameworks for modern mobile and web development
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 flex justify-center"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.title}
                onClick={() => setActiveTab(index)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-mono text-sm sm:text-base transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-black shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50'
                }`}
              >
                <category.icon size={16} className={`text-${category.color}-400`} />
                <span>{category.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active Category Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 sm:mb-12 flex justify-center"
          >
            <div className="inline-flex items-center space-x-3 mb-4">
              {(() => {
                const IconComponent = skillCategories[activeTab].icon;
                return <IconComponent size={32} className={`text-${skillCategories[activeTab].color}-400`} />;
              })()}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  {skillCategories[activeTab].title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {skillCategories[activeTab].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {skillCategories[activeTab].skills.map((skill, index) => {
              const IconComponent = getSkillIcon(skill)
              const color = getIconColor(skill)
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillClick(skill)}
                  className="group cursor-pointer"
                >
                  <div className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50 rounded-lg p-4 sm:p-6 transition-all duration-300 h-full flex flex-col items-center justify-center space-y-3">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gray-900/50 rounded-full flex items-center justify-center group-hover:bg-gray-800/50 transition-colors`}>
                      <IconComponent 
                        size={24} 
                        className={`text-${color}-400 group-hover:text-${color}-300 transition-colors`} 
                      />
                    </div>
                    <span className="text-sm sm:text-base font-mono text-gray-300 group-hover:text-white transition-colors text-center">
                      {skill}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 