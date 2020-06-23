<template>
  <section class="text-center w-full relative">
    <comic-image v-on:prev-comic="prevComic" v-on:next-comic="nextComic"></comic-image>
    <comic-nav v-on:prev-comic="prevComic" v-on:next-comic="nextComic" class="relative z-10"></comic-nav>
    <div class="text-gray-500 font-semibold my-4">{{ comicId }} / {{ latestComicId }}</div>
  </section>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import ComicImage from "@/components/ComicImage";
import ComicNav from "@/components/ComicNav.vue";
import { mapState, mapGetters } from "vuex"

export default {
  name: "comic",
  props: ["id"],
  components: {
    SiteNav,
    ComicImage,
    ComicNav
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
        'hasNextComic',
        'hasPrevComic'
    ]),
    ...mapState([
        'comicId',
        'latestComicId'
    ])
  },
  methods: {
    nextComic() {
      if (this.hasNextComic) {
        this.$router.push({path: `/comic/${this.comicId + 1}`});
        gtag("event", "NextComic", {event_category: "Comic"})
      }
    },
    prevComic() {
      if (this.hasPrevComic) {
        this.$router.push({path: `/comic/${this.comicId - 1}`});
        gtag("event", "PrevComic", {event_category: "Comic"})
      }
    },
  },
  watch: {
    $route() {
      this.$store.dispatch('updateComicId', this.id)
      this.$scrollTo(this.$parent.$refs.top);
    }
  },
  mounted() {
    this.$store.dispatch('loadComics').then(() => {
      this.$store.dispatch('updateComicId', this.id).then(() => {
        if (parseInt(this.id, 10) !== this.comicId) {
          if (this.comicId === this.latestComicId) {
            if (this.$router.currentRoute.path !== '/') {
              this.$router.replace({path: `/`})
            }
          } else {
            this.$router.replace({path: `/comic/${this.comicId}`})
          }
        }
      })
    })
  }
}
</script>
