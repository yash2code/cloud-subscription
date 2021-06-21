import React, { useState } from 'react'
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CardDetails from './CardDetails'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  creditCard: {
    fontSize: 32,
    fontFamily: 'NimbusSanD-Bol',
    lineHeight: '38px',
  },
}))

const ErrorMessage: React.FC<{}> = ({ children }) => (
  <Box marginTop={1} style={{ color: 'red' }}>
    {children}
  </Box>
)

interface PaymentFormProps {
  onToken: (token: string) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onToken }) => {
  const stripe = useStripe()
  const classes = useStyles()
  const elements = useElements()
  const [error, setError] = useState<any>(null)
  const [cardComplete, setCardComplete] = useState(false)

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    if (error) {
      setError(error.message)
      return
    }

    const cardElement = elements.getElement(CardNumberElement)
    if (!cardElement) {
      return
    }
    const payload = await stripe.createToken(cardElement, {})

    if (payload.error) {
      setError(payload.error)
    } else {
      return onToken(JSON.stringify(payload.token))
    }
  }

  return (
    <div>
      <Typography style={{ marginBottom: 24 }} className={classes.creditCard}>
        Enter your Credit Card details
      </Typography>

      <div>
        <CardDetails setFormComplete={setCardComplete} />
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <Box marginTop={5}>
        <Button
          onClick={handleSubmit}
          size='large'
          variant='contained'
          color='primary'
          disabled={!cardComplete}
        >
          Submit Payment
        </Button>
      </Box>
    </div>
  )
}

export default PaymentForm
