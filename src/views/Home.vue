<template>
  <ComicNav :id="id"></ComicNav>
</template>

<script>
import ComicNav from "@/components/ComicNav.vue";

export default {
  name: "home",
  props: ["id"],
  components: {
    ComicNav
  }
};
</script>
