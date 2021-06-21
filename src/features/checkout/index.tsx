import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { SubscriptionForm } from './components/SubscriptionForm'
import { Container } from '@material-ui/core'
import { FormContextProvider } from './context/FormContext'
import { useUserContext } from './context/UserContext'
import CartSummary from './components/CartSummary'
import PaymentForm from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import TnCForm from './components/TnCForm'
import { sendData } from '../../api/subscription_plans'

const stripePromise = loadStripe(
  'pk_test_51H8CL4IazqnffdrbJShELS12WC9l9uQPR5E5YS9SOExobZXRvGW4AaejQ22v69Sx7RjsGb1XW61a9itgydH94Zpw00M3urBLfd'
) // TODO: load from env file

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'white',
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    paymentform: {
      backgroundColor: '#FFECE4',
      maxWidth: 620,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  })
)

const getSteps = () => {
  return ['Select Subscription', 'T&C', 'Payment', 'Congratulations']
}

const Checkout = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [userState] = useUserContext()
  const steps = getSteps()
  const { planInfo } = userState

  const processPurchase = (data:string) => {
    return sendData({...userState, paymentData:data})
  }

  const onSubmit = async (payload: string) => {
    await processPurchase(JSON.parse(payload)).then(() => handleNext())
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SubscriptionForm />
      case 1:
        return <TnCForm />
      case 2:
        return (
          <Box className={classes.paymentform}>
            <PaymentForm onToken={onSubmit} />
          </Box>
        )
      case 3:
        return (
          <Typography color='primary' variant='h4'>
            {'Congrats !! You are now premium member.'}
          </Typography>
        )
      default:
        return 'Unknown step'
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <FormContextProvider>
      <Elements
        stripe={stripePromise}
        options={{
          fonts: [
            {
              cssSrc:
                'https://fonts.googleapis.com/css2?family=Arimo:wght@400&display=swap',
            },
          ],
        }}
      >
        <div className={classes.root}>
          <Container>
            <Typography gutterBottom color='primary' variant='h2'>Cloud Storage Provider</Typography>
            <main>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <Box
                    marginTop={{ xs: 2, md: 0 }}
                    marginBottom={{ xs: 3, md: 0 }}
                  >
                    <Typography align='left' gutterBottom variant='h3'>
                      {`Cart Summary`}
                    </Typography>
                    <Box marginTop={5}>
                      <CartSummary planInfo={planInfo} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={6}>
                  <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                          <Typography>{getStepContent(index)}</Typography>
                          <div className={classes.actionsContainer}>
                            {activeStep !== steps.length - 1 && (
                              <Box display='flex' justifyContent='space-around'>
                                <Button
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  className={classes.button}
                                >
                                  Back
                                </Button>
                                {activeStep < steps.length - 2 && (
                                  <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleNext}
                                    className={classes.button}
                                    disabled={
                                      userState.error || !userState.isAgree
                                    }
                                  >
                                    {activeStep === steps.length - 1
                                      ? 'Finish'
                                      : 'Next'}
                                  </Button>
                                )}
                              </Box>
                            )}
                          </div>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
            </main>
          </Container>
        </div>
      </Elements>
    </FormContextProvider>
  )
}

export default Checkout
