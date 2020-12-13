<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
      path="/lore/places"
      :img="require('@/assets/lore/lore-locations-btn.png')"
      alt="Location Lore"
    />
    <section-button
      path="/lore/culture"
      alt="Culture Lore"
      :img="require('@/assets/lore/lore-culture.png')"
    />
    <section-button
      path="/lore"
      :img="require('@/assets/lore/lore-characters.png')"
      alt="Character Lore"
      disabled
    />
  </section>
</template>

<script>
import SectionButton from '@/components/lore/SectionButton'
export default {
  name: 'LoreHome',
  components: { SectionButton },
}
</script>

<style scoped></style>
