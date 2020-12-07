<template>
  <div>
    <products-list-filter />
    <products-list :loading="productsLoading" :products="products" />
  </div>
</template>

<script>
import ProductsList from './ProductsList'
import ProductsListFilter from './ProductsListFilter'

export default {
  name: 'CommonProductsListPage',
  components: { ProductsListFilter, ProductsList },
  props: {
    loadProducts: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      products: [],
      productsLoading: false
    }
  },
  async created () {
    this.productsLoading = true
    this.products = await this.loadProducts()
    this.productsLoading = false
  }
}
</script>
