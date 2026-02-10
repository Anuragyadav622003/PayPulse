import { NextResponse } from 'next/server'

export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  details?: Record<string, string>
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, message?: string, status = 200) {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  }
  return NextResponse.json(response, { status })
}

/**
 * Create an error API response
 */
export function errorResponse(error: string, details?: Record<string, string>, status = 400) {
  const response: ApiErrorResponse = {
    success: false,
    error,
    ...(details && { details }),
  }
  return NextResponse.json(response, { status })
}

/**
 * Handle API errors with proper logging
 */
export function handleApiError(error: unknown) {
  console.error('[v0] API Error:', error)

  if (error instanceof Error) {
    return errorResponse(error.message, undefined, 500)
  }

  return errorResponse('An unexpected error occurred', undefined, 500)
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): { valid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {}

  for (const field of requiredFields) {
    if (!data[field] || data[field] === '') {
      errors[field] = `${field} is required`
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    ...(Object.keys(errors).length > 0 && { errors }),
  }
}
