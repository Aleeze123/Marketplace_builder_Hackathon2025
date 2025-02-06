export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-17'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skI8rimVE2m21Vke69glrdLn7aplm4yaGPhMastZjQIHS9hnNR4DhQYn0WfcTzlJsfuDjnhqibJNoBClDFyMomDjpqaaX1KAU3xGpWNSeUCoSIh0TqKVM4ZkKWrN9znp17621AhT8oGGrlTU6GgbnHKuCx1t4hE9FJR7PFLVTFgUooAEGEXK",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
