<template>
  <section class="text-center w-full relative">
    <comic-image
        img-path="/img/riley_comics/"
        v-on:prev-comic="prevComic"
        v-on:next-comic="nextComic"
    ></comic-image>
    <comic-nav class="relative z-10"></comic-nav>
    <div><input type="checkbox" v-model="isSecondViewSelected" @change="switchValue"> Toggle</div>
    <div class="text-gray-400 font-semibold my-4">
      {{ comicId }} / {{ latestComicId }}
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
  computed: {
    ...mapState(['comicId', 'latestComicId']),
  },
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