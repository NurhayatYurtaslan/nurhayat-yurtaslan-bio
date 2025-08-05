/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Modern Neon Palette
        'primary-cyan': 'var(--color-primary-cyan)',
        'primary-magenta': 'var(--color-primary-magenta)',
        'primary-yellow': 'var(--color-primary-yellow)',
        'primary-green': 'var(--color-primary-green)',
        'primary-blue': 'var(--color-primary-blue)',
        'primary-purple': 'var(--color-primary-purple)',
        'primary-orange': 'var(--color-primary-orange)',
        'primary-pink': 'var(--color-primary-pink)',
        
        // Background Colors - Deep Space
        'bg-deep': 'var(--color-bg-deep)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-medium': 'var(--color-bg-medium)',
        'bg-light': 'var(--color-bg-light)',
        'bg-card': 'var(--color-bg-card)',
        'bg-glass': 'var(--color-bg-glass)',
        
        // Text Colors
        'text-white': 'var(--color-text-white)',
        'text-light': 'var(--color-text-light)',
        'text-gray': 'var(--color-text-gray)',
        'text-dark': 'var(--color-text-dark)',
        'text-muted': 'var(--color-text-muted)',
        
        // Accent Colors
        'accent-glow': 'var(--color-accent-glow)',
        'accent-highlight': 'var(--color-accent-highlight)',
        'accent-success': 'var(--color-accent-success)',
        'accent-warning': 'var(--color-accent-warning)',
        'accent-error': 'var(--color-accent-error)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'display': 'var(--font-display)',
        'mono': 'var(--font-mono)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px var(--color-primary-cyan), 0 0 10px var(--color-primary-cyan), 0 0 15px var(--color-primary-cyan)'
          },
          '100%': { 
            textShadow: '0 0 10px var(--color-primary-cyan), 0 0 20px var(--color-primary-cyan), 0 0 30px var(--color-primary-cyan)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary-cyan) 0%, var(--color-primary-magenta) 50%, var(--color-primary-yellow) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-purple) 50%, var(--color-primary-pink) 100%)',
        'gradient-success': 'linear-gradient(135deg, var(--color-primary-green) 0%, var(--color-primary-cyan) 100%)',
        'gradient-warning': 'linear-gradient(135deg, var(--color-primary-yellow) 0%, var(--color-primary-orange) 100%)',
        'gradient-error': 'linear-gradient(135deg, var(--color-accent-error) 0%, var(--color-primary-magenta) 100%)',
        'gradient-background': 'linear-gradient(135deg, var(--color-bg-deep) 0%, var(--color-bg-dark) 50%, var(--color-bg-medium) 100%)',
        'gradient-card': 'linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-light) 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
        'glow-yellow': '0 0 20px rgba(255, 255, 0, 0.5), 0 0 40px rgba(255, 255, 0, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
        'hover-cyan': '0 0 30px rgba(0, 255, 255, 0.7), 0 0 60px rgba(0, 255, 255, 0.4)',
        'hover-magenta': '0 0 30px rgba(255, 0, 255, 0.7), 0 0 60px rgba(255, 0, 255, 0.4)',
        'card-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-medium': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'card-heavy': '0 20px 40px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
} 