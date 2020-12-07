import { Apisful } from './index'

export default {
  async create (productIds, description, customerName, customerEmail) {
    const response = await Apisful.post('orders/', {
      products: productIds,
      description,
      customer_name: customerName,
      customer_email: customerEmail
    })
    if (response.status === 201) {
      return true
    } else {
      return false
    }
  }
}
