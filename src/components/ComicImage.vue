<template>
  <transition name="fade" mode="out-in">
    <div class="image is-3by4" v-if="loading">
      <span style="font-size: 48px; position:absolute; top: 40%;">
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
    </div>
    <figure v-else class="image is-3by4">
      <img :src="src">
    </figure>
  </transition>
</template>

<script>
export default {
  name: "ComicImage",
  props: ["src"],
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    this.loadImage();
  },
  watch: {
    src() {
      this.loading = true;
      this.loadImage();
    }
  },
  methods: {
    loadImage() {
      let img, self;
      img = new Image();
      self = this;

      img.onload = () => {
        self.loading = false;
      };

      img.src = this.src;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>
