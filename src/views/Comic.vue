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
    <div>
      <router-link class="text-size-md text-primary font-bold hover:text-white" to="/archive">
        Archive
      </router-link>
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
      // Failed to update the ID because it was invalid in some way, fallback
      if (parseInt(this.id, 10) !== this.comicId) {
        if (this.comicId === this.latestComicId) {
          if (this.$router.currentRoute.path !== '/') {
            this.$router.replace({path: '/'})
          }
        } else {
          this.$router.replace({path: `/comic/${this.comicId}`})
        }
      }
      // Scroll to the top of the page if the user went to a comic directly
      if (this.comicId !== this.latestComicId) {
        this.$scrollTo(this.$parent.$refs.top)
      }
    })
  },
}
</script>
