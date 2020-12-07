<template>
  <div class="navbar">
    <div class="navbar__logo">
      <nuxt-link :to="{ name: 'index' }">
        <img src="~/assets/images/logo.svg" alt="logo">
      </nuxt-link>
    </div>
    <nuxt-link
      :to="{ name: 'cart'}"
      class="navbar__cart"
    >
      <img src="~/assets/icons/cart.svg" alt="cart">
      <span
        v-if="qty > 0"
        class="navbar__cart-count"
      >
        {{ qty }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommonNavbar',
  computed: {
    ...mapGetters({
      qty: 'cart/productsQty'
    })
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/initial-variables"

.navbar
  display: flex
  justify-content: space-between
  align-items: center
  padding-bottom: 1rem
  &__logo
    img
      height: 35px
  &__cart
    border: 1px solid #F5F4F2
    border-radius: 0 0 0 $border-radius
    padding: 2rem
    text-decoration: none
    position: relative
    &-count
      background: black
      color: white
      padding: 0.1rem 0.35rem
      border-radius: 50%
      font-size: 0.9rem
      font-weight: 500
      position: absolute
      margin-top: -0.5rem
      margin-left: -0.5rem
</style>
