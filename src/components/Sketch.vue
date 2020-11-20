<template>
  <div class="flex flex-col justify-center items-center">
    <p class="text-sm text-gray-500 font-semibold self-start mb-2">
      Posted on {{ longDate(date) }}
    </p>
    <div class="w-full mb-6">
      <a :href="src" target="_blank">
        <img class="w-full" :src="src" alt="Sketch" />
      </a>
    </div>
  </div>
</template>

<script>
const dateOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}
export default {
  name: 'Sketch',
  props: ['src', 'date'],
  methods: {
    longDate(date) {
      return new Date(date * 1000).toLocaleDateString('en-US', dateOptions)
    },
  },
}
</script>

<style scoped></style>
