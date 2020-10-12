<template>
  <section class="grid grid-cols-1 gap-4 justify-center items-center mb-4">
    <button>
      <router-link to="/lore/places/kuserra">
        <img
          class="h-24 rounded hover:filter-grayscale"
          src="@/assets/lore-locations-kuserra.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
    <button>
      <router-link to="">
        <img
          class="h-24 rounded filter-grayscale"
          src="@/assets/lore-locations-kuserra.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
    <button>
      <router-link to="">
        <img
          class="h-24 rounded filter-grayscale"
          src="@/assets/lore-locations-kuserra.png"
          alt="Kuserra Location Lore"
        />
      </router-link>
    </button>
  </section>
</template>

<script>
export default {
  name: 'LoreLocations',
}
</script>

<style scoped></style>
