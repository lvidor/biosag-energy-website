import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Ensure projectId is valid before creating client
const validProjectId = projectId && projectId.trim() !== '' ? projectId : 'beba1xg7'

export const client = createClient({
  projectId: validProjectId,
  dataset,
  apiVersion,
  useCdn: false, // false = fresh data from Sanity, no CDN cache delay
})
