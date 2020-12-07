<template>
  <div>
    <div v-show="loading" class="preloader preloader--fullpage" />
    <div class="product" :class="{ 'loading': loading }">
      <product-gallery :product="product" />
      <div class="product-info">
        <div class="product-info__title">
          <h1>{{ product.title }}</h1>
        </div>
        <div class="product-info__description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel consequat ligula, non consectetur
            eros. Vivamus hendrerit posuere nisi nec convallis. Vivamus consectetur venenatis luctus. Cras in luctus
            sapien, ut sollicitudin ipsum. Mauris suscipit mauris id vestibulum elementum. Nunc pretium interdum
            luctus.
          </p>
        </div>
        <div v-if="product.variants && product.variants.length > 0">
          <div class="product-info__color">
            <div class="field" :class="{ 'field--invalid': isSelectedColorInvalid }">
              <label class="field__label">Select a color:</label>
              <select v-model="selectedColor" class="field__input">
                <option
                  v-for="variant in product.variants"
                  :key="variant.id"
                  :value="variant.color"
                >
                  {{ variant.color }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="sizes.length > 0" class="product-info__size">
            <div class="radio-buttons" :class="{ 'radio-buttons--invalid': isSelectedSizeInvalid }">
              <div class="radio-buttons__header">
                Select a size:
              </div>
              <div
                v-for="size in sizes"
                :key="size"
                class="radio-buttons__option"
              >
                <input :id="`size-${size}`" v-model="selectedSize" type="radio" name="size" :value="size">
                <label :for="`size-${size}`">{{ size }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="product-info__price">
          {{ product.price | formatPrice }}
        </div>
        <div class="product-info__buttons">
          <button class="btn btn--primary btn--large" @click="addToCart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '~/api/product'
import ProductGallery from '~/components/product-details/ProductGallery'

export default {
  components: { ProductGallery },
  data () {
    return {
      product: {},
      loading: false,
      selectedColor: null,
      selectedSize: null,
      isSelectedColorInvalid: false,
      isSelectedSizeInvalid: false
    }
  },
  computed: {
    productId () {
      return this.$route.params.product.split('-').slice(-1).pop()
    },
    sizes () {
      if (!this.selectedColor) {
        return []
      }
      const variant = this.product.variants.find(variant => variant.color === this.selectedColor)
      return variant.available_sizes.split(', ')
    }
  },
  created () {
    this.loadProduct()
  },
  methods: {
    async loadProduct () {
      this.loading = true
      this.product = await Product.get(this.productId)
      this.loading = false
    },
    isValid () {
      let valid = true
      if (this.product.variants && this.product.variants.length) {
        if (!this.selectedColor) {
          this.isSelectedColorInvalid = true
          valid = false
        } else {
          this.isSelectedColorInvalid = false
        }
        if (!this.selectedSize) {
          this.isSelectedSizeInvalid = true
          valid = false
        } else {
          this.isSelectedSizeInvalid = false
        }
      }
      return valid
    },
    addToCart () {
      if (this.isValid()) {
        this.$store.commit('cart/addProduct', {
          product: this.product,
          color: this.selectedColor,
          size: this.selectedSize,
          price: this.product.price
        })
      }
    }
  },
  head () {
    return {
      title: `${this.product.title} | Clothing Store`
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/responsiveness"
@import "~/assets/sass/initial-variables"

.product
  display: flex
  flex-wrap: wrap

  &--loading
    opacity: 0.3
    pointer-events: none

  &-info
    +mobile
      width: 100%
    +tablet
      width: 100%
    +desktop
      width: 50%
    +widescreen
      width: 50%
    padding-bottom: 1rem
    +mobile
      padding-left: 0
    +tablet
      padding-left: 0
    +desktop
      padding-left: 5rem
    +widescreen
      padding-left: 5rem
    &__title
      font-size: 2.4rem
      padding-bottom: 1.5rem
      font-weight: 500
    &__description
      font-size: 1.1rem
      line-height: 1.5
      padding-bottom: 1.5rem
    &__color
      padding-bottom: 1rem
      &-header
        padding-bottom: 0.5rem
        font-weight: 500
        font-size: 1.2rem
    &__price
      font-weight: 500
      font-size: 2.2rem
      padding: 2rem 0
</style>
