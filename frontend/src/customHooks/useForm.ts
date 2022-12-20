import { useEffectUpdate } from './useEffectUpdate'
import { useState } from 'react'

export const useForm = (initialState: { [key: string]: any }, cb: Function) => {
  const [fields, setFields] = useState(initialState)

  useEffectUpdate(() => {
    cb?.(fields)
  }, [fields])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return [fields, handleChange, setFields] as const
}
