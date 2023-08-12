import { useEffectUpdate } from './useEffectUpdate'
import { useState } from 'react'

export const useNestedForm = <T extends { [key: string]: any }>(initialState: T, cb: Function) => {
  const [fields, setFields] = useState(initialState)

  useEffectUpdate(() => {
    cb?.(fields)
  }, [fields])

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { target } = event
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    const fieldPath = field.split('.')

    const updateNestedProperty = (obj: any, path: string[], value: any): any => {
      const [currentField, ...remainingPath] = path
      if (remainingPath.length === 0) {
        return { ...obj, [currentField]: value }
      }
      return {
        ...obj,
        [currentField]: updateNestedProperty(obj[currentField], remainingPath, value),
      }
    }
    const selectedOption = target.dataset.selectedOption

    if (selectedOption) {
      const optionValue = JSON.parse(selectedOption).value
      setFields((prevFields) => updateNestedProperty(prevFields, fieldPath, optionValue))
    } else {
      setFields((prevFields) => updateNestedProperty(prevFields, fieldPath, value))
    }
  }

  return [fields, handleChange, setFields] as const
}

// version of react include name attribute on textarea(16.9 and above)

// <VirtualizedSelect
//   name="user.dropdown"
//   onChange={handleChange}
//   data-selected-option={JSON.stringify(selectedOption)}
// />
