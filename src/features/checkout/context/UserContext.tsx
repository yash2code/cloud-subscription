import React from 'react'

const UserContext = React.createContext<any>({})

export const UserContextProvider: React.FC<{}> = ({ children }) => {
  const [userState, setUserState] = React.useState({
    planInfo: { duration: 12, storageInGB: 5, isUpfront: false },
    paymentInfo: {
      creditCardNumberComplete: false,
      expirationDateComplete: false,
      cvcComplete: false,
      cardNameError: false,
      cardNumberError: false,
      expiredError: false,
      cvcError: false,
    },
    error: false,
    isAgree: true,
    email: ''
  })

  const value = React.useMemo(
    () => [userState, setUserState],
    [userState, setUserState]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => React.useContext(UserContext)
