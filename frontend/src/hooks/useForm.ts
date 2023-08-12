import { useEffectUpdate } from './useEffectUpdate'
import { useState } from 'react'

export const useForm = <T extends { [key: string]: any }>(initialState: T, cb: Function) => {
  const [fields, setFields] = useState(initialState)
  console.log('useForm')
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
