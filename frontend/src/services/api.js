import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

// Helper: build multipart form with an image file
function imageForm(imageFile, extras = {}) {
  const form = new FormData()
  form.append('file', imageFile)
  Object.entries(extras).forEach(([k, v]) => form.append(k, v))
  return form
}

// Response normalizer — unwrap axios and surface clean errors
async function request(fn) {
  try {
    const res = await fn()
    return { data: res.data, error: null }
  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      err?.message ||
      'An unexpected error occurred'
    return { data: null, error: message }
  }
}

// ── Feature APIs ──────────────────────────────────────────────────────────────

export const identifyProduct = (imageFile) =>
  request(() => client.post('/product/identify', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const extractOCR = (imageFile) =>
  request(() => client.post('/ocr/extract', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const analyzeVision = (imageFile, question) =>
  request(() => client.post('/vision/analyze', imageForm(imageFile, { question }), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const identifyPlant = (imageFile) =>
  request(() => client.post('/plant/identify', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const identifyAnimal = (imageFile) =>
  request(() => client.post('/animal/identify', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const summarizeDocument = (imageFile) =>
  request(() => client.post('/document/summarize', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const identifyLandmark = (imageFile) =>
  request(() => client.post('/landmark/identify', imageForm(imageFile), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

export const searchProduct = (imageFile, question) =>
  request(() => client.post('/product/search', imageForm(imageFile, { question }), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

// Visual similarity — modular, endpoints may change later
export const findSimilarProducts = (imageFile, params = {}) =>
  request(() => client.post('/similarity/search', imageForm(imageFile, params), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }))

// Health check
export const checkHealth = () =>
  request(() => client.get('/health'))

export default client
