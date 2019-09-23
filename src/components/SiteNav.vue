<template>
  <div class="level-right">
    <div class="level-item is-size-5 is-size-6-mobile has-text-weight-bold">
      <router-link to="/">Comic</router-link>
    </div>
    <div class="level-item is-size-5 is-size-6-mobile has-text-weight-bold has-text-grey-dark">
      |
    </div>
    <div class="level-item is-size-5 is-size-6-mobile has-text-weight-bold">
      <router-link to="/sketches">Sketches</router-link>
    </div>
    <div class="level-item is-size-5 is-size-6-mobile has-text-weight-bold has-text-grey-dark">
      |
    </div>
    <div class="level-item is-size-5 is-size-6-mobile has-text-weight-bold">
      <router-link to="/lore">Lore</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SiteNav"
  }
</script>

<style scoped>

</style>