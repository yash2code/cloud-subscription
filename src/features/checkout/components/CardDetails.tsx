import React from 'react'
import Grid from '@material-ui/core/Grid'
import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC,
} from './commonTextFields'
import { Dispatch, SetStateAction } from 'react'
import { useUserContext } from '../context/UserContext'

interface CreditCardProps {
  setFormComplete: Dispatch<SetStateAction<boolean>>
}

const CreditCardDetail: React.FC<CreditCardProps> = ({ setFormComplete }) => {
  const [userState, setUserState] = useUserContext()
  const { paymentInfo } = userState
  const { cardNumberError, expiredError, cvcError } = paymentInfo

  const onElementChange =
    (field: any, errorField: any) =>
    ({ complete, error = { message: null } }: any) => {
      const expectedState = { ...userState.paymentInfo }

      expectedState[field] = complete

      setFormComplete(
        expectedState.creditCardNumberComplete &&
          expectedState.cvcComplete &&
          expectedState.expirationDateComplete
      )
      setUserState({
        ...userState,
        paymentInfo: {
          ...paymentInfo,
          [field]: complete,
          [errorField]: error.message,
        },
      })
    }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <StripeTextFieldNumber
          error={Boolean(cardNumberError)}
          labelErrorMessage={cardNumberError}
          onChange={onElementChange(
            'creditCardNumberComplete',
            'cardNumberError'
          )}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <StripeTextFieldExpiry
          error={Boolean(expiredError)}
          labelErrorMessage={expiredError}
          onChange={onElementChange('expirationDateComplete', 'expiredError')}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <StripeTextFieldCVC
          error={Boolean(cvcError)}
          labelErrorMessage={cvcError}
          onChange={onElementChange('cvcComplete', 'cvcError')}
        />
      </Grid>
    </Grid>
  )
}

export default CreditCardDetail
