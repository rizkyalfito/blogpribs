import { useState } from "react"
import { ZodSchema } from "zod"

export function useFormValidation<T>(schema: ZodSchema) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (data: unknown): { success: boolean; data?: T; errors?: Record<string, string> } => {
    const validation = schema.safeParse(data)

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as string
        fieldErrors[path] = err.message
      })
      setErrors(fieldErrors)
      return { success: false, errors: fieldErrors }
    }

    setErrors({})
    return { success: true, data: validation.data as T }
  }

  const clearErrors = () => setErrors({})

  return {
    errors,
    validate,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0,
  }
}
