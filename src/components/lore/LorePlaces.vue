<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <button>
      <router-link to="places/kuserra">
        <img
          class="h-24 rounded border border-primary hover:filter-grayscale hover:border-white"
          src="@/assets/lore/lore-locations-kuserra.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
    <button>
      <router-link to="places/unknown">
        <img
          class="h-24 rounded border border-primary hover:filter-grayscale hover:border-white"
          src="@/assets/lore/lore-locations-deadlands.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
    <button>
      <router-link to="places/unknown">
        <img
          class="h-24 rounded border border-primary hover:filter-grayscale hover:border-white"
          src="@/assets/lore/lore-locations-secret.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
    <BackButton path="/lore">Back to Lore Home</BackButton>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton'
export default {
  name: 'LoreLocations',
  components: { BackButton },
}
</script>

<style scoped></style>
