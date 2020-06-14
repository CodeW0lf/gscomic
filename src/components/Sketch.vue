<template>
  <div class="flex flex-col justify-center items-center">
    <p class="text-sm text-gray-600 font-semibold self-start mb-2">Posted on {{ date | moment }}</p>
    <div class="w-full mb-6">
      <a :href="src" target="_blank">
        <img class="w-full" :src="src" alt="Sketch">
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

<style scoped>
</style>