<template>
  <section class="text-center w-full relative">
    <comic-image v-on:prev-comic="prevComic" v-on:next-comic="nextComic" :src="comicUrl"></comic-image>
    <comic-nav
        class="relative z-10"
        :has-next-chapter="hasNextChapter()"
        :has-next-comic="hasNextComic()"
        :has-prev-chapter="hasPrevChapter()"
        :has-prev-comic="hasPrevComic()"
        v-on:next-comic="nextComic"
        v-on:next-chapter="nextChapter"
        v-on:prev-comic="prevComic"
        v-on:prev-chapter="prevChapter"
        v-on:latest-comic="latestComic"
        v-on:first-comic="firstComic">
    </comic-nav>
    <div class="text-gray-500 font-semibold my-4">{{comicId}} / {{ comicList["latest"] }}</div>
  </section>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import ComicImage from "@/components/ComicImage";
import ComicNav from "@/components/ComicNav.vue";

export default {
  name: "home",
  props: ["id"],
  components: {
    SiteNav,
    ComicImage,
    ComicNav
  },
  data() {
    return {
      comicId: 1,
      comicList: {
        1: 1,
        latest: 1
      },
      chapters: []
    };
  },
  computed: {
    comicUrl() {
      return '/comics/' + this.comicList[this.comicId];
    }
  },
  methods: {
    getComicId() {
      let comicId = parseInt(this.id, 10);
      if (isNaN(comicId) || comicId <= 0 || !(comicId in this.comicList)) {
        comicId = this.comicList["latest"];
        if (this.$route.path !== "/") {
          this.$router.replace({path: "/"});
        }
      }
      return comicId;
    },
    nextComic() {
      if (this.hasNextComic()) {
        this.$router.push({path: `/comic/${this.comicId + 1}`});
        gtag("event", "NextComic", {event_category: "Comic"})
      }
    },
    prevComic() {
      if (this.hasPrevComic()) {
        this.$router.push({path: `/comic/${this.comicId - 1}`});
        gtag("event", "PrevComic", {event_category: "Comic"})
      }
    },
    hasNextComic() {
      return this.comicId + 1 in this.comicList;
    },
    hasPrevComic() {
      return this.comicId - 1 in this.comicList;
    },
    hasNextChapter() {
      for (let val of this.chapters) {
        if (this.comicId < val) {
          return true;
        }
      }
      return false;
    },
    hasPrevChapter() {
      for (let val of this.chapters) {
        if (this.comicId > (val + 1)) {
          return true;
        }
      }
      return false;
    },
    nextChapter() {
      if (!this.hasNextChapter()) {
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
      if (!this.hasPrevChapter()) {
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
      if (!this.hasNextComic()) {
        return;
      }
      this.$router.replace({path: `/comic/${this.comicList["latest"]}`});
    },
    firstComic() {
      if (!this.hasPrevComic()) {
        return;
      }
      this.$router.push({path: `/comic/1`});
      gtag("event", "FirstComic", {event_category: "Comic"})
    },
  },
  watch: {
    $route() {
      this.comicId = this.getComicId();
      this.$scrollTo(this.$parent.$refs.top);
    }
  },
  mounted() {
    this.$axios.get("get-comics.php").then(res => {
      this.comicList = res.data;
      this.chapters = this.comicList.chapters;
      this.comicId = this.getComicId();
    });
  }
}
</script>
