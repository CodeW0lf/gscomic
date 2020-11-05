<template>
  <nav
    class="flex flex-col justify-between items-center w-full my-2 px-4 md:flex-row"
  >
    <patreon-link></patreon-link>
    <div class="mt-2 md:mt-0 text-size-md text-primary font-bold">
      <router-link class="hover:text-white" to="/">Comic</router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white" to="/sketches"
        >Sketches</router-link
      >
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white relative group" to="/lore"
        >Lore
        <!--        <span-->
        <!--          class="absolute top-0 right-0 inline-block h-2 w-2 -mt-0.5 -mr-1.5 rounded-full bg-pink-800 group-hover:bg-white"-->
        <!--        ></span>-->
      </router-link>
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
