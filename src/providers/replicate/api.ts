interface FetchPayload {
  method?: 'POST' | 'GET'
  token: string
  predictionId?: string
  body?: Record<string, any>
}

export const fetchImageGeneration = async(payload: FetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${payload.token || import.meta.env.REPLICATE_TOKEN}`,
    },
    method: payload.method || 'GET',
    body: payload.method === 'POST' ? JSON.stringify(payload.body || {}) : undefined,
  }
  let fetchUrl = 'https://api.replicate.com/v1/predictions'
  if (payload.predictionId)
    fetchUrl += `/${payload.predictionId}`
  return fetch(fetchUrl, initOptions)
}
