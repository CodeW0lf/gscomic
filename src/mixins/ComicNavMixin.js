import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
      'comicId',
      'chapters'
    ]),
    ...mapGetters([
      'hasNextComic',
      'hasPrevComic',
      'hasNextChapter',
      'hasPrevChapter'
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
    nextChapter() {
      if (!this.hasNextChapter) {
        return;
      }
      for (let val of this.chapters) {
        if (this.comicId < val) {
          this.$router.push({path: `/comic/${val}`});
          break;
        }
      }
    },
    prevChapter() {
      if (!this.hasPrevChapter) {
        return;
      }
      let latest = 0;
      for (let val of this.chapters) {
        if (this.comicId - 1 > val) {
          latest = val;
        }
      }
      latest = latest + 1; // Val represents end of chapter, inc by 1 for beginning
      this.$router.push({path: `/comic/${latest}`})
    },
    latestComic() {
      if (!this.hasNextComic) {
        return;
      }
      this.$router.replace({path: `/comic`});
    },
    firstComic() {
      if (!this.hasPrevComic) {
        return;
      }
      this.$router.push({path: `/comic/1`});
      gtag("event", "FirstComic", {event_category: "Comic"})
    },
  }
}