export default function getEnv(key: string, defaultValue: string = '') {
  const value = process.env[key];
  if (!value) {
    if (!defaultValue) throw new Error(`Environment variable ${key} not set`);
    return defaultValue;
  }
  return value;
}
