<template>
  <common-products-list-page :load-products="loadProducts" />
</template>

<script>
import CommonProductsListPage from '~/components/products-list/CommonProductsListPage'
import Product from '~/api/product'

export default {
  components: { CommonProductsListPage },
  computed: {
    categoryId () {
      return this.$route.params.category.split('-').slice(-1).pop()
    }
  },
  methods: {
    async loadProducts () {
      const filter = {
        category: this.categoryId
      }
      return await Product.list(filter)
    }
  }
}
</script>
