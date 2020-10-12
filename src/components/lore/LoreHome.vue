<template>
  <section class="grid grid-cols-1 gap-8 justify-center items-center mb-4">
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
          class="h-24 rounded filter-grayscale"
          src="@/assets/lore/lore-locations-secret.png"
          alt="Character Lore"
        />
      </router-link>
    </button>
    <button disabled>
      <router-link to="">
        <img
          class="h-24 rounded filter-grayscale"
          src="@/assets/lore/lore-locations-secret.png"
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
