<template>
  <div class="text-center mx-auto relative w-full" style="padding-top: 136%">
    <transition
        mode="out-in"
        enter-active-class="animated fadeIn fade-duration"
        leave-active-class="animated fadeOut fade-duration"
    >
      <div
          v-if="loading"
          key="spinner"
          class="absolute inset-0 w-full"
          style="top: 40%"
      >
        <spinner></spinner>
      </div>
      <div
          v-else
          @touchstart.passive="startDrag"
          @touchmove.passive="dragComic"
          @touchend.passive="stopDrag"
          key="image"
          class="absolute inset-0 w-full"
      >
        <svg
            class="fill-current text-white absolute w-24 h-24 transform rotate-90 transition duration-200"
            style="top: 40%"
            :style="{ opacity: lastMoveDist > 0 ? lastMoveDist / 2 + '%' : 0 }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
          <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
        <img class="transition" :src="src" alt="Comic Image"/>
        <svg
            class="fill-current text-white absolute w-24 h-24 transform -rotate-90 right-0 transition duration-200"
            style="top: 40%"
            :style="{ opacity: lastMoveDist < 0 ? -lastMoveDist / 2 + '%' : 0 }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
          <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {mapGetters} from 'vuex'

const comicChangeDragDistPx = 200

export default {
  name: 'ComicImage',
  props: ['imgPath'],
  computed: {
    ...mapGetters(['getComicFileName']),
    src() {
      return this.imgPath + this.getComicFileName
    },
  },
  components: {
    Spinner,
  },
  data() {
    return {
      loading: true,
      dragging: false,
      startX: 0,
      lastMoveDist: 0,
    }
  },
  mounted() {
    this.loading = true
    this.loadImage()
  },
  watch: {
    src() {
      this.loading = true
      this.loadImage()
    },
  },
  methods: {
    loadImage() {
      let img, self
      img = new Image()
      self = this

      img.onload = () => {
        self.loading = false
      }

      img.src = this.src
    },
    startDrag(e) {
      if (this.loading) {
        return
      }
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      this.startX = e.pageX
    },
    stopDrag() {
      this.dragging = false
      this.startX = 0
      this.lastMoveDist = 0
    },
    dragComic(e) {
      if (this.loading) {
        return
      }
      let moveDist = 0
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        moveDist = e.pageX - this.startX
        if (moveDist !== this.lastMoveDist) {
          this.lastMoveDist = moveDist
        }
        if (moveDist >= comicChangeDragDistPx) {
          this.$emit('prev-comic')
          this.dragging = false
          this.lastMoveDist = 0
        } else if (moveDist <= -comicChangeDragDistPx) {
          this.$emit('next-comic')
          this.dragging = false
          this.lastMoveDist = 0
        }
      }
    },
  },
}
</script>

<style scoped>
.fade-duration {
  animation-duration: 250ms;
}
</style>
