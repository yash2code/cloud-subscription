import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { fade, Typography } from '@material-ui/core'
import { StripeInput } from './StripeInput'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    '& .MuiFilledInput-root': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  labelRoot: {
    fontSize: 16,
    fontWeight: 400,
    color: fade(theme.palette.text.primary, 1),
  },
}))

function StripeTextField(props: any) {
  const {
    InputLabelProps,
    labelErrorMessage,
    stripeElement,
    InputProps = {},
    inputProps,
    ...other
  } = props
  const classes = useStyles()
  return (
    <TextField
      fullWidth
      variant='filled'
      classes={{
        root: classes.inputRoot,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
        classes: {
          root: classes.labelRoot,
        },
      }}
      InputProps={{
        ...InputProps,
        disableUnderline: true,
        inputProps: {
          ...inputProps,
          ...InputProps.inputProps,
          component: stripeElement,
        },
        inputComponent: StripeInput,
      }}
      {...other}
    />
  )
}

export function StripeTextFieldNumber(props: any) {
  return (
    <StripeTextField
      label={<Typography variant='body1'>{'Credit Card Number'}</Typography>}
      stripeElement={CardNumberElement}
      {...props}
    />
  )
}

export function StripeTextFieldExpiry(props: any) {
  return (
    <StripeTextField
      label={<Typography variant='body1'>{'Expiration Date'}</Typography>}
      stripeElement={CardExpiryElement}
      {...props}
    />
  )
}

export function StripeTextFieldCVC(props: any) {
  return (
    <StripeTextField
      label={<Typography variant='body1'>{'CVC Code'}</Typography>}
      stripeElement={CardCvcElement}
      {...props}
    />
  )
}

export function ZipTextField(props: any) {
  return <StripeTextField label='Zip Code' {...props} />
}
