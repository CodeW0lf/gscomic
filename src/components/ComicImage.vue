<template>
  <div class="text-center mx-auto relative w-full" style="padding-top:136%">
    <transition mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut faster">
      <div v-if="loading" key="spinner" class="absolute inset-0 w-full"  style="top: 40%">
        <spinner></spinner>
      </div>
      <div v-else @touchstart.passive="startDrag" @touchmove.passive="dragComic" @touchstop.passive="stopDrag"
           key="image" class="absolute inset-0 w-full">
        <img :src="src" alt="Comic Image">
      </div>
    </transition>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner"

export default {
  name: "ComicImage",
  props: ["src"],
  components: {
    Spinner
  },
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

<style scoped>
</style>
