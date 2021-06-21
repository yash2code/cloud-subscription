import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useUserContext } from '../context/UserContext'
import Isemail from 'isemail'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  })
)

const TnCForm = () => {
  const classes = useStyles()
  const [error, setError] = React.useState(false)
  const [isAgree, setAgree] = React.useState(false)
  const [userState, setUserState] = useUserContext()

  React.useEffect(() => {
    if (!Isemail.validate(userState.email, { minDomainAtoms: 2 }))
      setUserState({ ...userState, error: true }) // eslint-disable-next-line
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value || !Isemail.validate(value, { minDomainAtoms: 2 })) {
      setError(true)
      setUserState({ ...userState, error: true, email: value })
    } else {
      setError(false)
      setUserState({ ...userState, error: false, email: value })
    }
  }

  const handleCheckbox = (event: React.ChangeEvent<{}>, checked: boolean) => {
    const isChecked = checked
    if (!isChecked) {
      setAgree(false)
      setUserState({ ...userState, isAgree: false })
    } else {
      setAgree(true)
      setUserState({ ...userState, isAgree: true })
    }
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FormGroup className={classes.root}>
        <TextField
          error={userState.error}
          id='standard-error-helper-text'
          placeholder='Enter Email'
          helperText={error && 'Incorrect email'}
          required
          value={userState.email}
          onChange={handleChange}
          type='email'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          onChange={handleCheckbox}
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name='tnc'
              checked={userState.isAgree}
            />
          }
          label='Agree Terms and Conditions'
        />
        {!isAgree ? (
          <FormHelperText>
            *Please read and agree to terms and conditions
          </FormHelperText>
        ) : null}
      </FormGroup>
    </Box>
  )
}

export default TnCForm
