import {mapGetters, mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['comicId', 'chapters', 'comicPath']),
    ...mapGetters([
      'hasNextComic',
      'hasPrevComic',
      'hasNextChapter',
      'hasPrevChapter',
    ]),
  },
  methods: {
    nextComic() {
      if (this.hasNextComic) {
        this.$router.push({path: `/${this.comicPath}/${this.comicId + 1}`})
        // eslint-disable-next-line no-undef
        gtag('event', 'NextComic', {event_category: 'Comic'})
      }
    },
    prevComic() {
      if (this.hasPrevComic) {
        this.$router.push({path: `/${this.comicPath}/${this.comicId - 1}`})
        // eslint-disable-next-line no-undef
        gtag('event', 'PrevComic', {event_category: 'Comic'})
      }
    },
    nextChapter() {
      if (!this.hasNextChapter) {
        return
      }
      for (let val of this.chapters) {
        if (this.comicId < val) {
          this.$router.push({path: `/${this.comicPath}/${val}`})
          break
        }
      }
    },
    prevChapter() {
      if (!this.hasPrevChapter) {
        return
      }
      let latest = 0
      for (let val of this.chapters) {
        if (this.comicId - 1 > val) {
          latest = val
        }
      }
      latest = latest + 1 // Val represents end of chapter, inc by 1 for beginning
      this.$router.push({path: `/${this.comicPath}/${latest}`})
    },
    latestComic() {
      if (!this.hasNextComic) {
        return
      }
      this.$router.replace({path: `/${this.comicPath}`})
    },
    firstComic() {
      if (!this.hasPrevComic) {
        return
      }
      this.$router.push({path: `/${this.comicPath}/1`})
      // eslint-disable-next-line no-undef
      gtag('event', 'FirstComic', {event_category: 'Comic'})
    },
  },
}
