<template>
  <section
    class="flex flex-col items-center justify-between h-64 mt-8 text-gray-400 text-2xl"
  >
    <div>Awaiting Discovery.</div>
    <div class="text-center">
      <BackButton path="/lore/places">Back to Places</BackButton>
    </div>
  </section>
</template>

<script>
import BackButton from '@/components/lore/BackButton.vue'
export default {
  name: 'UnknownLocation',
  components: { BackButton },
}
</script>

<style scoped></style>
