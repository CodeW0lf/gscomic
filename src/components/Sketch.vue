<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Posted on {{ date | moment }}</p>
    </div>
    <div class="card-image">
      <a :href="src" target="_blank">
        <figure class="image">
          <img :src="src" alt="Sketch">
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "Sketch",
    props: ["src", "date"],
    filters: {
      moment(date) {
        return moment.unix(date).format("MMMM Do YYYY");
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 10px;
  }
</style>