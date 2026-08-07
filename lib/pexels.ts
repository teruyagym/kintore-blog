const PEXELS_API_KEY = process.env.PEXELS_API_KEY

export interface PexelsPhoto {
  url: string
  alt: string
  photographer: string
  photographerUrl: string
}

export async function fetchPexelsPhoto(query: string): Promise<PexelsPhoto | null> {
  if (!PEXELS_API_KEY) return null

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: false },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const photo = data.photos?.[0]
    if (!photo) return null
    return {
      url: photo.src.large2x,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
    }
  } catch {
    return null
  }
}
