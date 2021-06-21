import { SubscriptionFields } from '../api/subscription_plans'
import { SubscriptionFormValues } from '../features/checkout/components/SubscriptionForm'
import { getSubscriptionPlans } from '../features/checkout/helpers/getSubscriptionDetails'

interface CheckoutPriceParams {
  plans: SubscriptionFields[]
  planInfo: SubscriptionFormValues
}

const DISCOUNT: number = 10 // in %

export const calculateCheckoutPrice = ({
  plans,
  planInfo,
}: CheckoutPriceParams) => {
  const isUpfront = planInfo.isUpfront
  const rate =
    plans.find((plan) => plan.duration_months === Number(planInfo.duration))
      ?.price_usd_per_gb || 0
  const amount = rate * Number(planInfo.storageInGB) * Number(planInfo.duration)
  const total = !isUpfront ? amount : amount - amount * (DISCOUNT / 100) // in USD
  return total
}

export const calculatePrice = (values: SubscriptionFormValues) => {
  const planInfo = values
  return getSubscriptionPlans().then((plans) => {
    if (plans && plans.length > 0) {
      const price = calculateCheckoutPrice({ plans, planInfo })
      return price
    }
    return 0
  })
}
