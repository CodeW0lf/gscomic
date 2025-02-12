<script>
import deridealBanner from '@/assets/banner-vote-derideal.png'

export default {
  name: 'Links',
  data() {
    return {
      deridealBanner
    }
  }
}
</script>

<template>
  <section class="h-full min-h-96 text-white">
    <div class="h-full flex flex-col justify-center items-center gap-8 mt-12">
      <div class="prose">
        <h2>Recommended Comics</h2>
      </div>
      <div>
        <a href="https://derideal.com/" target="_blank">
          <img :src="deridealBanner" alt="Derideal Banner"/>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
