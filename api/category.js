import { Apisful } from './index'

export default {
  async list () {
    const response = await Apisful.get('categories/')
    return response.data.results
  }
}
