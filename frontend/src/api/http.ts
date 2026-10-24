const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  status: number
  details?: { field: string; message: string }[]

  constructor(status: number, message: string, details?: ApiError['details']) {
    super(message)
    this.status = status
    this.details = details
  }
}

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Check your connection and try again.')
  }

  if (res.status === 204) return undefined as T

  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(res.status, body?.message ?? 'Something went wrong.', body?.errors)
  }
  return body.data as T
}
