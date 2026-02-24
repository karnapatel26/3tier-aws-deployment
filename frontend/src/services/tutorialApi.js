import axios from 'axios'

const baseUrl =
  (import.meta.env.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')) ||
  '/api'

const client = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleResponse = (promise) =>
  promise.then((response) => response.data)

export const listTutorials = (title) =>
  handleResponse(
    client.get('/tutorials', {
      params: title ? { title } : undefined,
    }),
  )

export const listPublishedTutorials = () =>
  handleResponse(client.get('/tutorials/published'))

export const createTutorial = (payload) =>
  handleResponse(client.post('/tutorials', payload))

export const updateTutorial = (id, payload) =>
  handleResponse(client.put(`/tutorials/${id}`, payload))

export const deleteTutorial = (id) =>
  handleResponse(client.delete(`/tutorials/${id}`))

export const deleteAllTutorials = () =>
  handleResponse(client.delete('/tutorials'))

export const getTutorial = (id) =>
  handleResponse(client.get(`/tutorials/${id}`))

export const toErrorMessage = (err) => {
  if (err?.response?.data?.message) return err.response.data.message
  if (err instanceof Error) return err.message
  return 'Unexpected error. Please try again.'
}
