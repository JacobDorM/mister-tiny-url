import { useEffectUpdate } from './useEffectUpdate'
import { useState } from 'react'

export const useForm = (initialState, cb) => {
  const [fields, setFields] = useState(initialState)

  useEffectUpdate(() => {
    cb?.(fields)
  }, [fields])

  const handleChange = (event) => {
    const { target } = event
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return [fields, handleChange, setFields]
}
