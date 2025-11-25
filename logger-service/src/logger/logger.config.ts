export interface LoggerConfig {
  serviceName: string;          // Name of microservice
  level?: 'debug' | 'info' | 'warn' | 'error'; // default 'info'
}
