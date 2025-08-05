export const designSystem = {
  colors: {
    primary: {
      cyan: '#00ffff',
      blue: '#0080ff',
      green: '#00ff00',
      yellow: '#ffff00',
      orange: '#ff8000',
      red: '#ff0000',
      dark: '#1a1a1a'
    },
    background: {
      deep: '#0a0a0a',
      dark: '#1a1a1a',
      medium: '#2a2a2a',
      light: '#3a3a3a',
      card: '#1f1f1f',
      glass: 'rgba(31, 31, 31, 0.8)'
    },
    text: {
      white: '#ffffff',
      light: '#e0e0e0',
      gray: '#a0a0a0',
      dark: '#606060',
      muted: '#808080'
    },
    accent: {
      glow: '#00ffff',
      highlight: '#0080ff',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
      secondary: 'linear-gradient(135deg, #ffff00 0%, #00ff00 100%)',
      success: 'linear-gradient(135deg, #00ff00 0%, #00ffff 100%)',
      warning: 'linear-gradient(135deg, #ffff00 0%, #ff8000 100%)',
      error: 'linear-gradient(135deg, #ff0000 0%, #ff8000 100%)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      card: 'linear-gradient(135deg, rgba(31, 31, 31, 0.9) 0%, rgba(31, 31, 31, 0.7) 100%)',
      glass: 'linear-gradient(135deg, rgba(31, 31, 31, 0.1) 0%, rgba(31, 31, 31, 0.05) 100%)'
    }
  },
  typography: {
    fonts: {
      primary: 'Inter, sans-serif',
      display: 'Orbitron, monospace',
      mono: 'JetBrains Mono, monospace'
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    glow: {
      cyan: '0 0 20px rgba(0, 255, 255, 0.5)',
      blue: '0 0 20px rgba(0, 128, 255, 0.5)',
      green: '0 0 20px rgba(0, 255, 0, 0.5)',
      yellow: '0 0 20px rgba(255, 255, 0, 0.5)'
    },
    hover: {
      cyan: '0 0 30px rgba(0, 255, 255, 0.7)',
      blue: '0 0 30px rgba(0, 128, 255, 0.7)',
      green: '0 0 30px rgba(0, 255, 0, 0.7)',
      yellow: '0 0 30px rgba(255, 255, 0, 0.7)'
    },
    card: {
      light: '0 4px 20px rgba(0, 0, 0, 0.3)',
      heavy: '0 8px 40px rgba(0, 0, 0, 0.5)'
    }
  },
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '1s'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  cssVariables: {
    '--color-primary-cyan': '#00ffff',
    '--color-primary-blue': '#0080ff',
    '--color-primary-green': '#00ff00',
    '--color-primary-yellow': '#ffff00',
    '--color-primary-orange': '#ff8000',
    '--color-primary-red': '#ff0000',
    '--color-primary-dark': '#1a1a1a',
    
    '--color-bg-deep': '#0a0a0a',
    '--color-bg-dark': '#1a1a1a',
    '--color-bg-medium': '#2a2a2a',
    '--color-bg-light': '#3a3a3a',
    '--color-bg-card': '#1f1f1f',
    '--color-bg-glass': 'rgba(31, 31, 31, 0.8)',
    
    '--color-text-white': '#ffffff',
    '--color-text-light': '#e0e0e0',
    '--color-text-gray': '#a0a0a0',
    '--color-text-dark': '#606060',
    '--color-text-muted': '#808080',
    
    '--color-accent-glow': '#00ffff',
    '--color-accent-highlight': '#0080ff',
    '--color-accent-success': '#00ff00',
    '--color-accent-warning': '#ffff00',
    '--color-accent-error': '#ff0000',
    
    '--gradient-primary': 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
    '--gradient-secondary': 'linear-gradient(135deg, #ffff00 0%, #00ff00 100%)',
    '--gradient-success': 'linear-gradient(135deg, #00ff00 0%, #00ffff 100%)',
    '--gradient-warning': 'linear-gradient(135deg, #ffff00 0%, #ff8000 100%)',
    '--gradient-error': 'linear-gradient(135deg, #ff0000 0%, #ff8000 100%)',
    '--gradient-background': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    '--gradient-card': 'linear-gradient(135deg, rgba(31, 31, 31, 0.9) 0%, rgba(31, 31, 31, 0.7) 100%)',
    '--gradient-glass': 'linear-gradient(135deg, rgba(31, 31, 31, 0.1) 0%, rgba(31, 31, 31, 0.05) 100%)',
    
    '--font-primary': 'Inter, sans-serif',
    '--font-display': 'Orbitron, monospace',
    '--font-mono': 'JetBrains Mono, monospace',
    
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '2rem',
    '--spacing-2xl': '3rem',
    '--spacing-3xl': '4rem',
    
    '--radius-sm': '0.25rem',
    '--radius-md': '0.5rem',
    '--radius-lg': '1rem',
    '--radius-xl': '1.5rem',
    '--radius-2xl': '2rem',
    
    '--shadow-glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
    '--shadow-glow-blue': '0 0 20px rgba(0, 128, 255, 0.5)',
    '--shadow-glow-green': '0 0 20px rgba(0, 255, 0, 0.5)',
    '--shadow-glow-yellow': '0 0 20px rgba(255, 255, 0, 0.5)',
    '--shadow-hover-cyan': '0 0 30px rgba(0, 255, 255, 0.7)',
    '--shadow-hover-blue': '0 0 30px rgba(0, 128, 255, 0.7)',
    '--shadow-hover-green': '0 0 30px rgba(0, 255, 0, 0.7)',
    '--shadow-hover-yellow': '0 0 30px rgba(255, 255, 0, 0.7)',
    '--shadow-card-light': '0 4px 20px rgba(0, 0, 0, 0.3)',
    '--shadow-card-heavy': '0 8px 40px rgba(0, 0, 0, 0.5)',
    
    '--duration-fast': '0.2s',
    '--duration-normal': '0.3s',
    '--duration-slow': '0.5s',
    '--duration-slower': '1s',
    '--easing-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--easing-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
} 