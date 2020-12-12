<template>
  <section
    class="grid grid-cols-1 gap-8 justify-center items-center mb-4 md:mt-8"
  >
    <section-button
      path="culture/gods"
      :img="require('@/assets/lore/lore-culture-gods.png')"
      alt="Gods Lore"
    />
    <BackButton path="/lore">Back to Lore Home</BackButton>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton'
import SectionButton from '@/components/lore/SectionButton'

export default {
  name: 'LoreCulture',
  components: { SectionButton, BackButton },
}
</script>

<style scoped></style>
