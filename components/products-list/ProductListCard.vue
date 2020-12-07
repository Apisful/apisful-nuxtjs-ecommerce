<template>
  <div class="product-card">
    <nuxt-link
      :to="{
        name: 'products-product',
        params: { product: `${product.slug}-${product.id}` }
      }"
    >
      <div class="product-card__image">
        <picture>
          <!-- Use Apisful Image Transformation API https://docs.apisful.com/image-rest-api/ to get the specific image size -->
          <source
            media="(min-width: 1152px)"
            :srcset="`
              ${product.images[0]}?width=144 1x,
              ${product.images[0]}?width=216 1.5x,
              ${product.images[0]}?width=288 2x,
              ${product.images[0]}?width=432 3x,
              ${product.images[0]}?width=576 4x
            `"
          >
          <source
            media="(min-width: 960px)"
            :srcset="`
              ${product.images[0]}?width=168 1x,
              ${product.images[0]}?width=252 1.5x,
              ${product.images[0]}?width=336 2x,
              ${product.images[0]}?width=504 3x,
              ${product.images[0]}?width=672 4x
            `"
          >
          <source
            media="(min-width: 769px)"
            :srcset="`
              ${product.images[0]}?width=225 1x,
              ${product.images[0]}?width=338 1.5x,
              ${product.images[0]}?width=450 2x,
              ${product.images[0]}?width=675 3x,
              ${product.images[0]}?width=900 4x
            `"
          >
          <source
            media="(min-width: 415px)"
            :srcset="`
              ${product.images[0]}?width=640 1x,
              ${product.images[0]}?width=960 1.5x,
              ${product.images[0]}?width=1280 2x,
              ${product.images[0]}?width=1920 3x,
              ${product.images[0]}?width=2560 4x
            `"
          >
          <source
            media="(max-width: 414px)"
            :srcset="`
              ${product.images[0]}?width=286 1x,
              ${product.images[0]}?width=429 1.5x,
              ${product.images[0]}?width=572 2x,
              ${product.images[0]}?width=858 3x,
              ${product.images[0]}?width=1144 4x
            `"
          >
          <img :src="product.images[0]" :alt="product.title">
        </picture>
      </div>
      <div class="product-card__title">
        {{ product.title }}
      </div>
      <div class="product-card__price">
        {{ product.price | formatPrice }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ProductsListCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/responsiveness"
@import "~/assets/sass/initial-variables"

.product-card
  flex: 0 0 100%
  width: 100%
  padding: $product-card-gap
  transition: $duration
  &:hover
    opacity: 0.6
  a
    text-decoration: none
    color: #000
  +mobile
    flex: 0 0 100%
    width: 100%
  +tablet
    flex: 0 0 50%
    width: 50%
  +desktop
    flex: 0 0 33%
    width: 33%
  +widescreen
    flex: 0 0 25%
    width: 25%
  &__image
    background: $image-bg
    padding: 3rem
    margin-bottom: 1rem
    border-radius: $border-radius
    img
      width: 100%
  &__title
    text-align: center
    font-size: 1.1rem
  &__price
    padding-top: 0.5rem
    text-align: center
    font-weight: 500
    font-size: 1.3rem
  &__footer
    display: flex
    justify-content: space-between
</style>
