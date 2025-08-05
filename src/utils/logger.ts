// Developer-style Logger Utility
type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success'

interface LogConfig {
  level: LogLevel
  timestamp: boolean
  prefix: string
}

class Logger {
  private config: LogConfig

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      level: 'info',
      timestamp: true,
      prefix: '[NURLIFE]',
      ...config
    }
  }

  private getTimestamp(): string {
    return new Date().toISOString()
  }

  private getStyledMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.config.timestamp ? `[${this.getTimestamp()}]` : ''
    const prefix = this.config.prefix
    
    const levelColors = {
      info: 'color: #00ffff; font-weight: bold;',
      warn: 'color: #ffff00; font-weight: bold;',
      error: 'color: #ff0000; font-weight: bold;',
      debug: 'color: #8000ff; font-weight: bold;',
      success: 'color: #00ff00; font-weight: bold;'
    }

    const levelIcons = {
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      debug: '🐛',
      success: '✅'
    }

    const icon = levelIcons[level]
    const color = levelColors[level]
    
    return `%c${icon} ${prefix} ${timestamp} [${level.toUpperCase()}] ${message}`
  }

  info(message: string, data?: any): void {
    const styledMessage = this.getStyledMessage('info', message)
    console.log(styledMessage, 'color: #00ffff; font-weight: bold;', data || '')
  }

  warn(message: string, data?: any): void {
    const styledMessage = this.getStyledMessage('warn', message)
    console.warn(styledMessage, 'color: #ffff00; font-weight: bold;', data || '')
  }

  error(message: string, data?: any): void {
    const styledMessage = this.getStyledMessage('error', message)
    console.error(styledMessage, 'color: #ff0000; font-weight: bold;', data || '')
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      const styledMessage = this.getStyledMessage('debug', message)
      console.log(styledMessage, 'color: #8000ff; font-weight: bold;', data || '')
    }
  }

  success(message: string, data?: any): void {
    const styledMessage = this.getStyledMessage('success', message)
    console.log(styledMessage, 'color: #00ff00; font-weight: bold;', data || '')
  }

  // Component lifecycle logging
  componentMount(componentName: string): void {
    this.info(`Component mounted: ${componentName}`)
  }

  componentUnmount(componentName: string): void {
    this.info(`Component unmounted: ${componentName}`)
  }

  // API logging
  apiRequest(url: string, method: string): void {
    this.info(`API Request: ${method} ${url}`)
  }

  apiResponse(url: string, status: number): void {
    if (status >= 200 && status < 300) {
      this.success(`API Response: ${status} ${url}`)
    } else if (status >= 400 && status < 500) {
      this.warn(`API Response: ${status} ${url}`)
    } else {
      this.error(`API Response: ${status} ${url}`)
    }
  }

  // Performance logging
  performance(label: string, duration: number): void {
    this.info(`Performance: ${label} took ${duration}ms`)
  }

  // Error logging with stack trace
  errorWithStack(message: string, error: Error): void {
    this.error(message, {
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  }
}

// Create default logger instance
const logger = new Logger()

// Export both the class and default instance
export { Logger }
export default logger 