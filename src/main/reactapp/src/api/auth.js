const BASE_URL = 'http://localhost:8080'

export async function apiFetch(url, options={}) {
    const token = localStorage.getItem('token')

    const headers = {
          'Content-Type': 'application/json',
            ...(options.headers || {}),
    }

    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || '요청 실패')
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}