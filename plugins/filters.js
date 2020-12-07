import Vue from 'vue'

Vue.filter('formatPrice', (value) => {
  if (!value) {
    return value
  } else {
    return `$${value.toFixed(2)}`
  }
})
