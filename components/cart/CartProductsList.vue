<template>
  <table class="cart-list">
    <thead>
      <tr class="cart-list-header">
        <th />
        <th>title</th>
        <th>price</th>
        <th>quantity</th>
        <th>total</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="cartProduct in cartProducts"
        :key="cartProduct.key"
        class="cart-list-item"
      >
        <td class="cart-list-item__image">
          <nuxt-link
            :to="{
              name: 'products-product',
              params: { product: `${cartProduct.product.slug}-${cartProduct.product.id}` }
            }"
          >
            <img :src="`${cartProduct.product.images[0]}?width=60`">
          </nuxt-link>
        </td>
        <td>
          {{ cartProduct.product.title }}
          <span v-if="cartProduct.product.variants && cartProduct.product.variants.length > 0">
            (color: <strong>{{ cartProduct.color }}</strong>, size: <strong>{{ cartProduct.size }}</strong>)
          </span>
        </td>
        <td>{{ cartProduct.product.price | formatPrice }}</td>
        <td>
          <div class="cart-list-item__qty-block">
            <img
              src="~/assets/icons/minus.svg"
              alt="decrement"
              class="cart-list-item__action"
              @click="changeQty(cartProduct.key, -1)"
            >
            <span class="cart-list-item__qty-count">{{ cartProduct.qty }}</span>
            <img
              src="~/assets/icons/plus.svg"
              alt="increment"
              class="cart-list-item__action"
              @click="changeQty(cartProduct.key, 1)"
            >
          </div>
        </td>
        <td>{{ cartProduct.product.price * cartProduct.qty | formatPrice }}</td>
        <td>
          <img
            src="~/assets/icons/trash.svg"
            alt="delete"
            class="cart-list-item__action"
            @click="remove(cartProduct.key)"
          >
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="cart-list-footer">
        <td />
        <td>Total</td>
        <td />
        <td />
        <td>{{ cartPrice | formatPrice }}</td>
        <td />
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartProductsList',
  computed: {
    ...mapGetters({
      cartProducts: 'cart/productsList',
      cartPrice: 'cart/totalPrice'
    })
  },
  methods: {
    changeQty (productKey, step) {
      this.$store.commit('cart/changeProductQty', { productKey, step })
    },
    remove (productKey) {
      this.$store.commit('cart/removeProduct', { productKey })
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/initial-variables"
@import "~/assets/sass/responsiveness"

.cart-list
  width: 100%
  +mobile
    display: block
    overflow-x: auto
  &-header
    & > th
      padding: 0.5rem
  &-footer
    & > td
      padding: 0.8rem 0.5rem
      font-size: 1.2rem
      font-weight: 500
  &-item
    border-bottom: 1px solid #ddd
    border-top: 1px solid #ddd
    padding: 1rem 0
    strong
      font-weight: 500
    & > td
      padding: 1rem 0.5rem
      +mobile
        min-width: ($tablet - 1px) / 6
    &__image
      img
        max-height: 70px
    &__qty
      &-block
        display: flex
        align-items: center
    &__action
      cursor: pointer
      padding: 1rem
</style>
