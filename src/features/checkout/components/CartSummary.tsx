import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  field: {
    width: 200,
  },
  inputRoot: {
    background: theme.palette.action.disabledBackground,
  },
  notchedOutline: {
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: 'transparent',
    backgroundColor: theme.palette.primary.light,
  },
}))

type PlanInfo = {
  duration: number
  storageInGB: number
  isUpfront: boolean
  price: number
}

interface CartSummaryProps {
  planInfo: PlanInfo
}

const CartSummary: React.FC<CartSummaryProps> = ({ planInfo }) => {
  const classes = useStyles()
  const { duration, isUpfront, price, storageInGB } = planInfo

  return (
    <Box textAlign='left'>
      <ul className='square'>
        <li>
          <Box display='flex' justifyContent='space-between' marginTop={3}>
            <Typography className={classes.field}>Duration:</Typography>
            <Typography
              className={classes.field}
            >{`${duration} months`}</Typography>
          </Box>
        </li>

        <li>
          <Box display='flex' justifyContent='space-between' marginTop={3}>
            <Typography className={classes.field}>Storage:</Typography>
            <Typography
              className={classes.field}
            >{`${storageInGB} GB`}</Typography>
          </Box>
        </li>

        <li>
          <Box display='flex' justifyContent='space-between' marginTop={3}>
            <Typography className={classes.field}>Upfront Payment:</Typography>
            <Typography className={classes.field}>
              {isUpfront ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </li>
        <li>
          <Box display='flex' justifyContent='space-between' marginTop={3}>
            <Typography color='primary' variant='body2'  className={classes.field}>Total Amount:</Typography>
            <Typography color='primary' variant='body2' className={classes.field}>
              {price && `$${price}`}
            </Typography>
          </Box>
        </li>
      </ul>
    </Box>
  )
}

export default CartSummary
