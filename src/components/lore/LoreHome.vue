<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <button>
      <router-link to="/lore/places">
        <img
          class="h-24 rounded border border-primary hover:filter-grayscale hover:border-white"
          src="@/assets/lore/lore-locations-btn.png"
          alt="Location Lore"
        />
      </router-link>
    </button>
    <button disabled>
      <router-link to="">
        <img
          class="h-24 rounded border border-gray-700 cursor-not-allowed filter-grayscale"
          src="@/assets/lore/lore-characters.png"
          alt="Character Lore"
        />
      </router-link>
    </button>
    <button disabled>
      <router-link to="">
        <img
          class="h-24 rounded border border-gray-700 cursor-not-allowed filter-grayscale"
          src="@/assets/lore/lore-culture.png"
          alt="Culture Lore"
        />
      </router-link>
    </button>
  </section>
</template>

<script>
export default {
  name: 'LoreHome',
}
</script>

<style scoped></style>
