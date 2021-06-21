import {
  fetchSubscriptionPlans,
  SubscriptionFields,
} from '../../../api/subscription_plans'

type Fields = {
  label: string
  value: number | boolean | string
}

type FormOptions = Array<{
  label: string
  value: string
  fields: Array<Fields>
}>

export const getSubscriptionPlans = async (): Promise<SubscriptionFields[]> => {
  const data = await fetchSubscriptionPlans()
  const { subscription_plans: plans } = data
  return plans
}

export const SUBSCRIPTION_FORM_OPTIONS: FormOptions = [
  {
    label: 'Select Duration',
    value: 'duration',
    fields: [
      { label: '3 months', value: 3 },
      { label: '6 months', value: 6 },
      { label: '12 months', value: 12 },
    ],
  },
  {
    label: 'Select Storage',
    value: 'storageInGB',
    fields: [
      { label: '5 GB', value: 5 },
      { label: '10 GB', value: 10 },
      { label: '50 GB', value: 50 },
    ],
  },
  {
    label: 'Will you pay upfront for 10% discount? ',
    value: 'isUpfront',
    fields: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
]
