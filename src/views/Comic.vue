<template>
  <section class="text-center w-full relative">
    <comic-image
        img-path="/img/comics/"
        v-on:prev-comic="prevComic"
        v-on:next-comic="nextComic"
    ></comic-image>
    <comic-nav class="relative z-10"></comic-nav>
    <div class="text-gray-400 font-semibold my-4">
      {{ comicId }} / {{ latestComicId }}
    </div>
  </section>
</template>

<script>
import ComicImage from '@/components/ComicImage.vue'
import ComicNav from '@/components/ComicNav.vue'
import ComicNavMixin from '@/mixins/ComicNavMixin'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'comic',
  props: ['id'],
  mixins: [ComicNavMixin],
  components: {
    ComicImage,
    ComicNav,
  },
  computed: {
    ...mapState(['comicId', 'latestComicId']),
  },
  methods: {
    ...mapActions(['updateComicId', 'loadComics']),
  },
  watch: {
    $route() {
      this.updateComicId(this.id)
      this.$scrollTo(this.$parent.$refs.top)
    },
  },
  mounted() {
    this.loadComics().then(() => {
      this.updateComicId(this.id)
      if (parseInt(this.id, 10) !== this.comicId) {
        if (this.comicId === this.latestComicId) {
          if (this.$router.currentRoute.path !== '/') {
            this.$router.replace({path: '/'})
          }
        } else {
          this.$router.replace({path: `/comic/${this.comicId}`})
        }
      }
    })
  },
}
</script>
