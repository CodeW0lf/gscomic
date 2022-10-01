<template>
  <nav
      class="
      flex flex-col
      justify-between
      items-center
      w-full
      my-2
      px-4
      lg:flex-row
    "
  >
    <patreon-link></patreon-link>
    <div class="mt-4 lg:mt-0 text-center text-size-md text-primary font-bold">
      <router-link class="hover:text-white" to="/">Comic</router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white" to="/rileycomic">Riley Comic</router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white relative group" to="/characters">
        Characters
        <new-badge v-if="isCharactersBadgeEnabled"></new-badge>
      </router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white" to="/sketches">Sketches</router-link>
      <span class="px-2 text-gray-600">|</span>
      <router-link class="hover:text-white relative group" to="/lore">
        Lore
        <new-badge v-if="isLoreBadgeEnabled"></new-badge>
      </router-link>
    </div>
  </nav>
</template>

<script>
import PatreonLink from '@/components/PatreonLink.vue'
import {mapActions, mapGetters} from 'vuex'
import NewBadge from '@/components/NewBadge.vue'

export default {
  name: 'SiteNav',
  components: {
    NewBadge,
    PatreonLink,
  },
  computed: {
    ...mapGetters({
      isLoreBadgeEnabled: 'isLoreBadgeEnabled',
      isCharactersBadgeEnabled: 'isCharactersBadgeEnabled'
    }),
  },
  methods: {
    ...mapActions(['loadBadges']),
  },
  mounted() {
    this.loadBadges()
  },
}
</script>

<style scoped></style>
