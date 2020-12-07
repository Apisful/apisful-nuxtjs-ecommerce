<template>
  <div class="product-gallery">
    <div class="product-gallery__preview">
      <picture>
        <!-- Use Apisful Image Transformation API https://docs.apisful.com/image-rest-api/ to get the specific image size -->
        <source
          media="(min-width: 1152px)"
          :srcset="`
            ${activeImage}?width=368 1x,
            ${activeImage}?width=552 1.5x,
            ${activeImage}?width=736 2x,
            ${activeImage}?width=1104 3x,
            ${activeImage}?width=1472 4x
          `"
        >
        <source
          media="(min-width: 960px)"
          :srcset="`
            ${activeImage}?width=272 1x,
            ${activeImage}?width=408 1.5x,
            ${activeImage}?width=544 2x,
            ${activeImage}?width=816 3x,
            ${activeImage}?width=1088 4x
          `"
        >
        <source
          media="(min-width: 769px)"
          :srcset="`
            ${activeImage}?width=513 1x,
            ${activeImage}?width=770 1.5x,
            ${activeImage}?width=1026 2x,
            ${activeImage}?width=1539 3x,
            ${activeImage}?width=2052 4x
          `"
        >
        <source
          media="(min-width: 415px)"
          :srcset="`
            ${activeImage}?width=576 1x,
            ${activeImage}?width=864 1.5x,
            ${activeImage}?width=1152 2x,
            ${activeImage}?width=1728 3x,
            ${activeImage}?width=2304 4x
          `"
        >
        <source
          media="(max-width: 414px)"
          :srcset="`
            ${activeImage}?width=222 1x,
            ${activeImage}?width=333 1.5x,
            ${activeImage}?width=444 2x,
            ${activeImage}?width=666 3x,
            ${activeImage}?width=888 4x
          `"
        >
        <img :src="activeImage" :alt="product.title">
      </picture>
    </div>
    <div class="product-gallery__thumbs">
      <div
        v-for="image in product.images"
        :key="image"
        class="product-gallery__thumbs-item"
        @click="showImage(image)"
      >
        <img :src="`${image}?width=54`" :alt="product.title">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductGallery',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedImage: ''
    }
  },
  computed: {
    activeImage () {
      if (this.selectedImage) {
        return this.selectedImage
      } else if (this.product.images) {
        return this.product.images[0]
      } else {
        return ''
      }
    }
  },
  methods: {
    showImage (img) {
      this.selectedImage = img
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/responsiveness"
@import "~/assets/sass/initial-variables"

.product-gallery
  +mobile
    width: 100%
  +tablet
    width: 100%
  +desktop
    width: 50%
  +widescreen
    width: 50%
  &__preview
    background: $image-bg
    padding: 5rem
    border-radius: $border-radius
    picture, img
      width: 100%
  &__thumbs
    display: flex
    flex-wrap: wrap
    &-item
      max-width: 70px
      padding: 0.5rem
      margin: 0.5rem 0.5rem 1.5rem 0
      background: $image-bg
      border-radius: $border-radius
      cursor: pointer
      &:first-child
        margin-left: 0
</style>
