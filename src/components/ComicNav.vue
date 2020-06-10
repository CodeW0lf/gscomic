<template>
  <section class="comic-section" id="comic-top" ref="comicTop">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <a href="https://www.patreon.com/elitetrick" @click="patreonClick" target="_blank" class="patreon-button">
            <img alt="patreon" src="../assets/become_a_patron_button@2x.png">
          </a>
          <span v-if="!hasNextComic()" class="animate__animated animate__bounceIn animate__delay-1s go-patreon has-text-grey has-text-weight-bold"><i class="fas fa-arrow-left"></i> Read the next 5 comics for only $1!</span>
        </div>
      </div>
      <SiteNav></SiteNav>
    </div>

    <comic-image v-on:prev-comic="prevComic" v-on:next-comic="nextComic" :src="'/comics/' + comicList[comicId]"></comic-image>

    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <template v-if="hasPrevComic()">
            <span class="icon is-large is-size-3-mobile is-size-2 has-text-primary">
              <a @click="firstComic" class="tooltip is-tooltip-black" data-tooltip="First Comic"><i class="fas fa-fast-backward"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-3-mobile is-size-2 has-text-grey-dark">
              <i class="fas fa-fast-backward"></i>
            </span>
          </template>

          <template v-if="hasPrevChapter()">
            <span class="icon is-large is-size-3-mobile is-size-3point5 has-text-primary">
              <a @click="prevChapter" class="tooltip is-tooltip-black" data-tooltip="Chapter Start"><i class="fas fa-step-backward"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-3-mobile is-size-3point5 has-text-grey-dark">
              <i class="fas fa-step-backward"></i>
            </span>
          </template>

          <template v-if="hasPrevComic()">
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-primary">
              <a @click="prevComic" class="tooltip is-tooltip-black" data-tooltip="Prev Comic"><i class="fas fa-caret-left"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-grey-dark">
              <i class="fas fa-caret-left"></i>
            </span>
          </template>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <template v-if="hasNextComic()">
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-primary">
              <a @click="nextComic" class="tooltip is-tooltip-bottom is-tooltip-black" data-tooltip="Next Comic"><i class="fas fa-caret-right"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-grey-dark">
              <i class="fas fa-caret-right"></i>
            </span>
          </template>

          <template v-if="hasNextChapter()">
            <span class="icon is-large is-size-3-mobile is-size-3point5 has-text-primary">
              <a @click="nextChapter" class="tooltip is-tooltip-bottom is-tooltip-black" data-tooltip="Next Chapter"><i class="fas fa-step-forward"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-3-mobile is-size-3point5 has-text-grey-dark">
              <i class="fas fa-step-forward"></i>
            </span>
          </template>

          <template v-if="hasNextComic()">
            <span class="icon is-large is-size-3-mobile is-size-2 has-text-primary">
              <a @click="latestComic" class="tooltip is-tooltip-bottom is-tooltip-black" data-tooltip="Latest Comic"><i class="fas fa-fast-forward"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-3-mobile is-size-2 has-text-grey-dark">
              <i class="fas fa-fast-forward"></i>
            </span>
          </template>
        </div>
      </div>
    </div>
    <span class="has-text-grey has-text-weight-bold">{{ comicId }} / {{ comicList["latest"] }}</span><br>
    <SocialLinks></SocialLinks>
  </section>
</template>

<script>
import ComicImage from "@/components/ComicImage.vue";
import SiteNav from "@/components/SiteNav.vue";
import SocialLinks from "@/components/SocialLinks";

export default {
  name: "ComicNav",
  props: ["id"],
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
        this.$router.push({ path: `/comic/${this.comicId + 1}` });
        this.$scrollTo(this.$refs.comicTop);
        gtag("event", "NextComic", {event_category: "Comic"})
      }
    },
    prevComic() {
      if (this.hasPrevComic()) {
        this.$router.push({ path: `/comic/${this.comicId - 1}` });
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
      for (let val of this.chapters) {
        if (this.comicId < val) {
          this.$router.push({ path: `/comic/${val}` });
          this.$scrollTo(this.$refs.comicTop);
          break;
        }
      }
    },
    prevChapter() {
      let latest = 0;
      for (let val of this.chapters) {
        if (this.comicId - 1 > val) {
          latest = val;
        }
      }
      latest = latest + 1; // Val represents end of chapter, inc by 1 for beginning
      this.$router.push({ path: `/comic/${latest}` })
    },
    latestComic() {
      this.$router.replace({ path: `/comic/${this.comicList["latest"]}` });
      this.$scrollTo(this.$refs.comicTop);
    },
    firstComic() {
      this.$router.push({ path: `/comic/1` });
      this.$scrollTo(this.$refs.comicTop);
      gtag("event", "FirstComic", {event_category: "Comic"})
    },
    patreonClick() {
      gtag("event", "Patreon", {event_category: "Social"});
    }
  },
  computed: {
    shareUrl() {
      let message = encodeURIComponent(
        "Check out God Slayers Comic (@ComicSlayers)!"
      );
      return (
        "https://twitter.com/intent/tweet?url=https://www.godslayerscomic.com" +
        this.$route.path +
        "&text=" +
        message
      );
    }
  },
  components: {
    SocialLinks,
    ComicImage,
    SiteNav
  },
  watch: {
    $route() {
      this.comicId = this.getComicId();
    }
  },
  mounted() {
    this.$axios.get("get-comics.php").then(res => {
      this.comicList = res.data;
      this.chapters = this.comicList.chapters;
      this.comicId = this.getComicId();
    });
  }
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/main.scss";

  a:hover {
    color: $primary;
  }
  .image {
    img {
      border-radius: 4px;
    }
  }
  .is-size-0 {
    font-size: 3.5rem;
    line-height: 1rem;
  }
  .is-size-3point5 {
    font-size: 2.3rem;
  }
  .level {
    margin: 1.5rem;
  }
  .comic-section {
    margin: 20px auto;
    max-width: 900px;
  }
  .go-patreon {
    margin-left: 15px;
  }
</style>
