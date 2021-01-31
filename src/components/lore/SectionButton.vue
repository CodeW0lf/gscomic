<template>
  <button>
    <router-link :to="disabled ? '' : path" class="inline-block">
      <img
        class="rounded border"
        :class="[displayClass, displaySizeClass]"
        :src="img"
        :alt="alt"
      />
    </router-link>
  </button>
</template>

<script>
export default {
  props: {
    img: String,
    alt: String,
    path: String,
    small: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  name: 'SectionButton',
  computed: {
    displayClass() {
      if (this.disabled === true) {
        return 'border-gray-700 cursor-not-allowed filter-grayscale'
      }
      return 'border-primary hover:border-white hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black'
    },
    displaySizeClass() {
      if (this.small === true) {
        return 'h-18'
      }
      return 'h-24'
    },
  },
}
</script>

<style scoped></style>
