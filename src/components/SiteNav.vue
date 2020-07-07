<template>
  <nav
    class="flex flex-col justify-between items-center w-full my-2 px-4 md:flex-row"
  >
    <patreon-link></patreon-link>
    <div class="text-size-md text-primary font-bold">
      <router-link class="hover:text-white" to="/">Comic</router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white" to="/sketches"
        >Sketches</router-link
      >
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white" to="/lore">Lore</router-link>
    </div>
  </nav>
</template>

<script>
import PatreonLink from '@/components/PatreonLink'

export default {
  name: 'SiteNav',
  components: {
    PatreonLink,
  },
}
</script>

<style scoped></style>
