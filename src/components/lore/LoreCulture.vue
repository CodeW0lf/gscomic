<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
      path="culture/gods"
      :img="cultureGodsBtn"
      alt="Gods Lore"
    />
    <BackButton class="mt-12" path="/lore">Back to Lore Home</BackButton>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton.vue'
import SectionButton from '@/components/lore/SectionButton.vue'
import cultureGodsBtn from '@/assets/lore/lore-culture-gods.png'

export default {
  name: 'LoreCulture',
  components: { SectionButton, BackButton },
  data() {
    return {
      cultureGodsBtn
    }
  }
}
</script>

<style scoped></style>
