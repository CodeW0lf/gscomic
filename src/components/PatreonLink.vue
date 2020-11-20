<template>
  <div
    class="flex flex-col justify-center items-center mb-2 sm:flex-row md:mb-0"
  >
    <a
      href="https://www.patreon.com/elitetrick"
      @click="patreonClick"
      target="_blank"
      class="py-2 px-3 bg-patreon-lighter text-white text-xs sm:text-sm rounded hover:bg-gray-700 inline-block"
    >
      <svg
        class="fill-current inline-block w-4 h-4 align-middle"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Patreon icon</title>
        <path
          d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"
        />
      </svg>
      Become a Patron
    </a>
    <span
      class="text-gray-600 font-semibold inline-block animated bounceIn delay-1s text-sm mt-2 sm:text-base sm:mt-0"
    >
      <svg
        class="fill-current w-5 inline-block mx-2 hidden sm:inline-block md:align-middle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"
        />
      </svg>
      Read the next 5 comics for only $1!
    </span>
  </div>
</template>

<script>
export default {
  name: 'PatreonLink',
  methods: {
    patreonClick() {
      // eslint-disable-next-line no-undef
      gtag('event', 'Patreon', { event_category: 'Social' })
    },
  },
}
</script>

<style scoped></style>
