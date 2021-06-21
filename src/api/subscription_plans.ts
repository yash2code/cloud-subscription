import axios from 'axios'
import { APIClient } from '../utils/apiClient'

export type SubscriptionFields = {
  duration_months: number
  price_usd_per_gb: number
}

export type SubscriptionPlans = {
  subscription_plans: SubscriptionFields[]
}

export const fetchSubscriptionPlans = () => {
  return APIClient.get<SubscriptionPlans>('/prices')
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(response.status.toString())
    })
    .catch(({ response }) => {
      throw new Error(response.status)
    })
}

export const sendData = (userState:any) => {
  return axios.post('https://httpbin.org/post',{
    userState
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(response.status.toString())
    })
    .catch(({ response }) => {
      throw new Error(response.status)
    })
}


