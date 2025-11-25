export const formatLog = (serviceName: string, message: string, meta?: any) => {
  return `[${serviceName}] ${message} ${meta ? JSON.stringify(meta) : ''}`;
};
