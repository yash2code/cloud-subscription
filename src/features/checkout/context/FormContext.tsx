import React from 'react'
import { SubscriptionFormValues } from '../components/SubscriptionForm'

const FormContext = React.createContext<any>({})

export const FormContextProvider: React.FC<{}> = ({ children }) => {
  const [formState, setFormState] = React.useState<SubscriptionFormValues>({
    duration: 12,
    storageInGB: 5,
    isUpfront: false,
  })

  const value = React.useMemo(
    () => [formState, setFormState],
    [formState, setFormState]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => React.useContext(FormContext)
