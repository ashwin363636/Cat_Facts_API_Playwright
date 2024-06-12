export function getEnvProp(key: string): string {
  const str = process.env[key]
  return str ?? ''
}
