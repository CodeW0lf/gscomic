<template>
  <transition name="fade" mode="out-in">
    <div class="image is-3by4" v-if="loading">
      <span style="font-size: 48px; position:absolute; top: 40%;">
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
    </div>
    <figure @touchstart="startDrag" @touchmove="dragComic" @touchstop="stopDrag" v-else class="image is-3by4">
      <img :src="src" alt="Comic">
    </figure>
  </transition>
</template>

<script>
export default {
  name: "ComicImage",
  props: ["src"],
  data() {
    return {
      loading: true,
      dragging: false,
      startX: 0
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
    },
    startDrag(e) {
      if (this.loading) {
        return;
      }
      e = e.changedTouches ? e.changedTouches[0] : e;
      this.dragging = true;
      this.startX = e.pageX;
    },
    stopDrag() {
      this.dragging = false;
      this.startX = 0;
    },
    dragComic(e) {
      if (this.loading) {
        return;
      }
      let moveDist = 0;
      e = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging) {
        moveDist = e.pageX - this.startX;
        if (moveDist >= 200) {
          this.$emit('prev-comic');
          this.dragging = false;
        } else if (moveDist <= -200) {
          this.$emit('next-comic');
          this.dragging = false;
        }
      }
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
