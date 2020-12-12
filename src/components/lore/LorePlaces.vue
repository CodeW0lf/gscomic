<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
      path="places/kuserra"
      :img="require('@/assets/lore/lore-locations-kuserra.png')"
      alt="Kuserra Location Lore"
    />

    <section-button
      path="places/unknown"
      :img="require('@/assets/lore/lore-locations-deadlands.png')"
      alt="Kuserra Location Lore"
    />

    <section-button
      path="places/unknown"
      :img="require('@/assets/lore/lore-locations-secret.png')"
      alt="Kuserra Location Lore"
    />

    <BackButton path="/lore">Back to Lore Home</BackButton>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton'
import SectionButton from '@/components/lore/SectionButton'

export default {
  name: 'LoreLocations',
  components: { SectionButton, BackButton },
}
</script>

<style scoped></style>
