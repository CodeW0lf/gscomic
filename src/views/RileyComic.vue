<template>
  <section class="text-center w-full relative">
    <comic-image
        img-path="/img/riley_comics/"
        v-on:prev-comic="prevComic"
        v-on:next-comic="nextComic"
    ></comic-image>
    <comic-nav class="relative z-10"></comic-nav>
    <div class="flex flex-col justify-center items-center">
      <div class="switch-button">
        <input class="switch-button-checkbox" type="checkbox" v-model="isSecondViewSelected" @change="switchValue">
        <label class="switch-button-label" for=""><span class="switch-button-label-span">A</span></label>
      </div>
      <div class="text-gray-400 font-semibold my-4">
        {{ comicId }} / {{ latestComicId }}
      </div>
    </div>
  </section>
</template>

<script>
import ComicImage from '@/components/ComicImage'
import ComicNav from '@/components/ComicNav.vue'
import ComicNavMixin from '@/mixins/ComicNavMixin'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'RileyComic',
  props: ['id'],
  mixins: [ComicNavMixin],
  components: {
    ComicImage,
    ComicNav,
  },
  data() {
    return {
      version: 'a',
      isSecondViewSelected: false
    }
  },
  computed: mapState(['comicId', 'latestComicId']),
  methods: {
    ...mapActions(['updateComicId', 'loadRileyComics']),
    switchValue() {
      if (this.isSecondViewSelected) {
        this.version = 'b'
      } else {
        this.version = 'a'
      }
      this.loadComics()
    },
    loadComics() {
      this.loadRileyComics(this.version).then(() => {
        this.updateComicId(this.id)
        if (parseInt(this.id, 10) !== this.comicId) {
          if (this.comicId === this.latestComicId) {
            if (this.$router.currentRoute.path !== '/rileycomic') {
              this.$router.replace({path: `/rileycomic`})
            }
          } else {
            this.$router.replace({path: `/rileycomic/${this.comicId}`})
          }
        }
      })
    }
  },
  watch: {
    $route() {
      this.updateComicId(this.id)
      this.$scrollTo(this.$parent.$refs.top)
    },
  },
  mounted() {
    this.loadComics()
  },
}
</script>

<style>
.switch-button {
  background: rgba(55, 65, 81, 1);
  border-radius: 30px;
  overflow: hidden;
  width: 100px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  color: #fff;
  position: relative;
  padding-right: 50px;
}

.switch-button:before {
  content: "B";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  pointer-events: none;
}

.switch-button-checkbox {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
}

.switch-button-checkbox:checked + .switch-button-label:before {
  transform: translateX(50px);
  transition: transform 300ms linear;
}

.switch-button-checkbox + .switch-button-label {
  position: relative;
  padding: 10px 0;
  display: block;
  user-select: none;
  pointer-events: none;
}

.switch-button-checkbox + .switch-button-label:before {
  content: "";
  background: rgba(59, 156, 125, 1);
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 30px;
  transform: translateX(0);
  transition: transform 300ms;
}

.switch-button-checkbox + .switch-button-label .switch-button-label-span {
  position: relative;
}
</style>