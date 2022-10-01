<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
      path="places/kuserra"
      :img="kuserraBtn"
      alt="Kuserra Location Lore"
    />

    <section-button
      path="places/unknown"
      :img="deadlandsBtn"
      alt="Deadlands"
      disabled
    />

    <section-button
      path="places/unknown"
      :img="secretBtn"
      alt="Secret"
      disabled
    />

    <BackButton path="/lore">Back to Lore Home</BackButton>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton.vue'
import SectionButton from '@/components/lore/SectionButton.vue'
import kuserraBtn from '@/assets/lore/lore-locations-kuserra.png'
import deadlandsBtn from '@/assets/lore/lore-locations-deadlands.png'
import secretBtn from '@/assets/lore/lore-locations-secret.png'

export default {
  name: 'LoreLocations',
  components: { SectionButton, BackButton },
  data() {
    return {
      kuserraBtn,
      deadlandsBtn,
      secretBtn
    }
  }
}
</script>

<style scoped></style>
