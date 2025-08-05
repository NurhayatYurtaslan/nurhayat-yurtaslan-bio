'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import bioData from '../data/bio.json'
import Header from '../components/Header'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-cyber-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Header personal={bioData.personal} socialMedia={bioData.socialMedia} />
          
          <div className="w-full max-w-5xl space-y-16 sm:space-y-20 lg:space-y-24 mt-16 sm:mt-20 lg:mt-24">
            <Education education={bioData.education} />
            <Skills 
              mobileDevelopment={bioData.skills.mobileDevelopment}
              backendServices={bioData.skills.backendServices}
              webDevelopment={bioData.skills.webDevelopment}
              developmentTools={bioData.skills.developmentTools}
              versionControl={bioData.skills.versionControl}
              architecture={bioData.skills.architecture}
            />
            <Experience experience={bioData.experience} />
            <Projects projects={bioData.projects} />
            <Certifications certifications={bioData.certifications} />
          </div>
        </motion.div>
      </div>
    </main>
  )
} 