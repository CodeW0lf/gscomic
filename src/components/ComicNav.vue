<template>
  <section class="comic-section">
    <div id="comic-top" class="level is-mobile">
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
        </div>
        <div class="level-item">
          <span v-if="false" class="icon is-large is-size-3-mobile is-size-3point5 has-text-primary">
            <a href="#" class="tooltip is-tooltip-black" data-tooltip="Chapter Start"><i class="fas fa-step-backward"></i></a>
          </span>
          <span v-else class="icon is-large is-size-3-mobile is-size-3point5 has-text-grey-dark">
            <i class="fas fa-step-backward"></i>
          </span>
        </div>
        <div class="level-item">
          <template v-if="hasPrevComic()">
            <span class="icon is-medium is-size-1-mobile is-size-0 has-text-primary">
              <a @click="prevComic" class="tooltip is-tooltip-black" data-tooltip="Prev Comic"><i class="fas fa-caret-left"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-medium is-size-1-mobile is-size-0 has-text-grey-dark">
              <i class="fas fa-caret-left"></i>
            </span>
          </template>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item is-size-5 has-text-weight-bold">
          <router-link to="/">Comic</router-link>
        </div>
        <div class="level-item is-size-5 has-text-weight-bold has-text-grey-dark tooltip is-tooltip-black"
          data-tooltip="Coming Soon">
          Lore
        </div>
      </div>
    </div>
    <comic-image v-on:prev-comic="prevComic" v-on:next-comic="nextComic" :src="'/comics/' + comicList[comicId]"></comic-image>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <a href="https://www.patreon.com/elitetrick" @click="patreonClick" target="_blank" class="patreon-button">
            <img src="../assets/become_a_patron_button@2x.png">
          </a>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <template v-if="hasNextComic()">
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-primary">
              <a @click="nextComic" v-scroll-to="'#comic-top'" class="tooltip is-tooltip-bottom is-tooltip-black" data-tooltip="Next Comic"><i class="fas fa-caret-right"></i></a>
            </span>
          </template>
          <template v-else>
            <span class="icon is-large is-size-1-mobile is-size-0 has-text-grey-dark">
              <i class="fas fa-caret-right"></i>
            </span>
          </template>
        </div>
        <div class="level-item">
          <span v-if="false" class="icon is-large is-size-3-mobile is-size-3point5 has-text-primary">
            <a href="#" class="tooltip is-tooltip-bottom is-tooltip-black" data-tooltip="Next Chapter"><i class="fas fa-step-forward"></i></a>
          </span>
          <span v-else class="icon is-large is-size-3-mobile is-size-3point5 has-text-grey-dark">
            <i class="fas fa-step-forward"></i>
          </span>
        </div>
        <div class="level-item">
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
    <span class="icon is-large is-size-3">
      <a :href="shareUrl" @click="twitterClick" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
    </span>
    <span class="icon is-large is-size-3">
      <a href="https://discord.gg/HKZmH3U" @click="discordClick" target="_blank" class="discord"><i class="fab fa-discord"></i></a>
    </span>
  </section>
</template>

<script>
import ComicImage from "@/components/ComicImage.vue";

export default {
  name: "ComicNav",
  props: ["id"],
  data() {
    return {
      comicId: 1,
      comicList: {
        1: 1,
        latest: 1
      }
    };
  },
  methods: {
    getComicId() {
      let comicId = parseInt(this.id, 10);
      if (isNaN(comicId) || comicId <= 0 || !(comicId in this.comicList)) {
        comicId = this.comicList["latest"];
        this.$router.push({ path: "/" });
      }
      return comicId;
    },
    nextComic() {
      if (this.hasNextComic()) {
        this.$router.push({ path: `/comic/${this.comicId + 1}` });
      }
    },
    prevComic() {
      if (this.hasPrevComic()) {
        this.$router.push({ path: `/comic/${this.comicId - 1}` });
      }
    },
    hasNextComic() {
      return this.comicId + 1 in this.comicList;
    },
    hasPrevComic() {
      return this.comicId - 1 in this.comicList;
    },
    latestComic() {
      this.$router.replace({ path: `/comic/${this.comicList["latest"]}` });
    },
    firstComic() {
      this.$router.push({ path: `/comic/1` });
    },
    discordClick() {
      gtag("event", "Discord", {event_category: "Social"});
    },
    twitterClick() {
      gtag("event", "Twitter", {event_category: "Social"});
    },
    patreonClick() {
      gtag("event", "Patreon", {event_category: "Social"});
    }
  },
  computed: {
    shareUrl() {
      let message = encodeURIComponent(
        "Check out this God Slayers Comic post!"
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
    ComicImage
  },
  watch: {
    $route() {
      this.comicId = this.getComicId();
    }
  },
  mounted() {
    this.$axios.get("get-comics.php").then(res => {
      this.comicList = res.data;
      this.comicId = this.getComicId();
    });
  }
};
</script>

<style lang="scss" scoped>
.patreon-button {
  width: 148px;
  height: 34px;

  img {
    border-radius: 4px;
  }
  &:hover {
    opacity: 0.8;
  }
}
.image {
  img {
    border-radius: 4px;
  }
}
.nav-button {
  width: 40px;
}
.is-size-0 {
  font-size: 3.5rem;
  line-height: 1rem;
}
.is-size-3point5 {
  font-size: 2.3rem;
}
.level {
  margin: 0 10px 0 15px !important;
}
.comic-section {
  margin: 20px auto;
  max-width: 900px;
}
.discord {
  color: #7289da;
  &:hover {
    color: #99aab5;
  }
}
.twitter {
  color: rgb(27, 149, 224);
  &:hover {
    color: #99aab5;
  }
}
</style>
