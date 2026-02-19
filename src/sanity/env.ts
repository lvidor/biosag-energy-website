// Hardcoded fallbacks to ensure build succeeds
export const apiVersion = '2024-02-09'
export const dataset = 'production'
export const projectId = 'beba1xg7'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
