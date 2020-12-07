<template>
  <div class="filters">
    <div class="filter">
      <ul class="filter__list">
        <li class="filter__header">
          Categories:
        </li>
        <li
          class="filter__item"
          :class="{ 'filter__item--active': !$route.params.category }"
        >
          <nuxt-link :to="{ name: 'index' }">
            All
          </nuxt-link>
        </li>
        <li
          v-for="category in categories"
          :key="category.id"
          class="filter__item"
          :class="{ 'filter__item--active': $route.params.category === `${category.slug}-${category.id}` }"
        >
          <nuxt-link
            :to="{
              name: 'categories-category',
              params: { category: `${category.slug}-${category.id}` }
            }"
          >
            {{ category.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductsListFilter',
  computed: {
    ...mapState({
      categories: state => state.filters.categories
    })
  },
  created () {
    if (!this.categories) {
      this.$store.dispatch('filters/fetchCategories')
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/sass/initial-variables"

@mixin filter__item--active-hover
  border-bottom-style: solid
  opacity: 0.5

.filters
  display: flex

.filter
  padding: 1rem 0
  &__list
    display: flex
    flex-wrap: wrap
    list-style: none
  &__header
    font-weight: 500
  &__item
    padding-left: 1rem
    a
      color: #000
      text-decoration: none
      border-bottom: 1px dotted #000
      transition: $duration
      &:hover
        +filter__item--active-hover
    &--active
      a
        +filter__item--active-hover
</style>
