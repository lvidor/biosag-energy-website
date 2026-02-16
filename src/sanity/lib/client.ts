import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Ensure projectId is valid before creating client
const validProjectId = projectId && projectId.trim() !== '' ? projectId : 'beba1xg7'

export const client = createClient({
  projectId: validProjectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
