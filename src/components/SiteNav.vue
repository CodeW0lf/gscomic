<template>
  <div class="level-right">
    <div class="level-item page-link is-size-5 is-size-6-mobile has-text-weight-bold">
      <router-link to="/">Comic</router-link>
      <span class="page-link has-text-grey-dark">|</span>
      <router-link to="/sketches">Sketches</router-link>
      <span class="page-link has-text-grey-dark">|</span>
      <router-link to="/lore">Lore</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SiteNav"
  }
</script>

<style lang="scss" scoped>
  .page-link {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>