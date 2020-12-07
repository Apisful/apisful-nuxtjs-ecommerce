<template>
  <div>
    <div v-show="status === statuses.creating" class="preloader preloader--fullpage" />
    <div
      class="cart"
      :class="{ 'loading': status === statuses.creating }"
    >
      <div v-show="status === statuses.success" class="cart-message">
        <div class="cart-message__icon">
          <img src="~/assets/icons/check.svg" alt="success">
        </div>
        <div class="cart-message__title">
          Your order has been placed. We're going to contact you soon.
        </div>
      </div>
      <div v-show="status === statuses.fail" class="cart-message">
        <div class="cart-message__icon">
          <img src="~/assets/icons/x-circle.svg" alt="fail">
        </div>
        <div class="cart-message__title">
          Something went wrong. Try to place the order again or contact us using email.
        </div>
      </div>
      <div v-show="status !== statuses.success">
        <cart-products-list />
        <div class="cart-checkout">
          <form @submit.prevent="onSubmit">
            <div class="field" :class="{ 'field--invalid': isFullNameInvalid }">
              <label class="field__label">Full Name</label>
              <input v-model="fullName" type="text" class="field__input">
            </div>
            <div class="field" :class="{ 'field--invalid': isEmailInvalid }">
              <label class="field__label">Email</label>
              <input v-model="email" type="text" class="field__input">
            </div>
            <div class="field">
              <button type="submit" class="btn btn--primary btn--large">
                Place an order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartProductsList from '~/components/cart/CartProductsList'

const cartStatus = {
  init: 0,
  creating: 1,
  success: 2,
  fail: 3
}

export default {
  components: { CartProductsList },
  data () {
    return {
      fullName: '',
      email: '',
      isFullNameInvalid: false,
      isEmailInvalid: false,
      status: cartStatus.init,
      statuses: cartStatus
    }
  },
  methods: {
    isValid () {
      let valid = true
      if (this.fullName.length < 1) {
        this.isFullNameInvalid = true
        valid = false
      } else {
        this.isFullNameInvalid = false
      }
      if (!this.email.includes('@')) {
        this.isEmailInvalid = true
        valid = false
      } else {
        this.isEmailInvalid = false
      }
      return valid
    },
    async onSubmit () {
      if (this.isValid()) {
        this.status = cartStatus.creating
        const success = await this.$store.dispatch('cart/submit', { fullName: this.fullName, email: this.email })
        this.status = success ? cartStatus.success : cartStatus.fail
      }
    }
  },
  head: {
    title: 'Cart | Clothing Store'
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/initial-variables"
@import "~/assets/sass/responsiveness"

.cart
  &-checkout
    padding-top: 1rem
    width: 50%
    float: right
    text-align: right
    +mobile
      width: 100%
  &-message
    padding: 3rem 0
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    &__icon
      padding-right: 1rem
      img
        width: 3rem
    &__title
      font-size: 1.5rem
      font-weight: 500
</style>
