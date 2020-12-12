<template>
  <button>
    <router-link :to="path">
      <img
        class="h-24 rounded border"
        :class="displayClass"
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
    disabled: { type: Boolean, default: false },
  },
  name: 'SectionButton',
  computed: {
    displayClass() {
      if (this.disabled === true) {
        return 'border-gray-700 cursor-not-allowed filter-grayscale'
      }
      return 'border-primary hover:border-white hover:ring-4 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black'
    },
  },
}
</script>

<style scoped></style>
