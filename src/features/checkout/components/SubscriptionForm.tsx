import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { ToggleButtonGroup } from 'formik-material-ui-lab'
import { SUBSCRIPTION_FORM_OPTIONS as options } from '../helpers/getSubscriptionDetails'
import { useUserContext } from '../context/UserContext'
import { calculatePrice } from '../../../utils/calculateCheckoutPrice'

export interface SubscriptionFormValues {
  duration: number
  storageInGB: number
  isUpfront: boolean
}

export const SubscriptionForm: React.FC<{}> = () => {
  const [userState, setUserState] = useUserContext()
  const { planInfo } = userState

  React.useEffect(() => {
    calculatePrice(planInfo).then((price) =>
      setUserState({
        ...userState,
        planInfo: { ...planInfo, price },
        error: false,
      })
    ) // eslint-disable-next-line
  }, [])

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const string = e.currentTarget.value
    const name = e.currentTarget.name
    const isFalse = string === 'false'
    const isTrue = string === 'true'
    const value =
      !isFalse && !isTrue
        ? { [e.currentTarget.name]: Number(e.currentTarget.value) }
        : { [e.currentTarget.name]: isFalse ? false : true }
    if (name === 'isUpfront') {
      setFieldValue(name, isFalse ? false : true)
    } else {
      setFieldValue(e.currentTarget.name, value[e.currentTarget.name])
    }
    const values = { ...planInfo, ...value }

    const price = await calculatePrice(values)
    setUserState({ ...userState, planInfo: { ...values, price } })
  }

  return (
    <div>
      <Formik
        initialValues={planInfo}
        enableReinitialize
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false)
        }}
      >
        {({ setFieldValue, submitForm, isSubmitting }) => (
          <Form>
            {options.map((op) => {
              return (
                <Grid
                  key={op.label}
                  container
                  style={{ marginBottom: 16 }}
                  alignItems='center'
                >
                  <Grid item xs={12} md={4}>
                    <Typography variant='body1'>{op.label}</Typography>
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item xs={12} md={7}>
                    <Field
                      flex={2}
                      component={ToggleButtonGroup}
                      name={op.value}
                      type='checkbox'
                      exclusive
                      size='small'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, setFieldValue)
                      }
                    >
                      {op.fields.map((field) => {
                        return (
                          <ToggleButton
                            key={field.label}
                            value={field.value}
                            name={op.value}
                          >
                            {field.label}
                          </ToggleButton>
                        )
                      })}
                    </Field>{' '}
                  </Grid>
                </Grid>
              )
            })}
          </Form>
        )}
      </Formik>
    </div>
  )
}
