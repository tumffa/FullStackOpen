import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  return {
    fieldProps: {
      type,
      value,
      onChange
    },
    resetField
  }
}

export default useField