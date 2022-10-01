<template>
  <section
      class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
        path="/lore/places"
        :img="placesBtn"
        alt="Location Lore"
    />
    <section-button
        path="/lore/culture"
        alt="Culture Lore"
        :img="cultureBtn"
    />
  </section>
</template>

<script>
import SectionButton from '@/components/lore/SectionButton.vue'
import placesBtn from '@/assets/lore/lore-locations-btn.png'
import cultureBtn from '@/assets/lore/lore-culture.png'

export default {
  name: 'LoreHome',
  components: {SectionButton},
  data() {
    return {
      placesBtn,
      cultureBtn
    }
  }
}
</script>

<style scoped></style>
