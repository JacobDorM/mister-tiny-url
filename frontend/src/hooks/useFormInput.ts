import { useEffectUpdate } from './useEffectUpdate'
import { useState } from 'react'

export const useFormInput = <T extends { [key: string]: any }>(initialState: T, cb: Function) => {
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

  const inputAtr = (field: string) => {
    return {
      onChange: handleChange,
      name: field,
      id: field,
      value: fields[field],
    }
  }

  return [inputAtr, fields, setFields] as const
}
