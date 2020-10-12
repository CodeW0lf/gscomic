<template>
  <router-link :to="path" class="text-xl text-center hover:text-white">
    <svg
      class="fill-current h-6 w-6 inline-block align-text-top"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'BackButton',
  props: ['path'],
}
</script>

<style scoped></style>
