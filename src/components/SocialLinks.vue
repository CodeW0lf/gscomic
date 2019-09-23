<template>
  <div>
    <span class="icon is-large is-size-3">
        <a :href="shareUrl" @click="twitterClick" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
    </span>
    <span class="icon is-large is-size-3">
        <a href="https://discord.gg/HKZmH3U" @click="discordClick" target="_blank" class="discord"><i class="fab fa-discord"></i></a>
    </span>
  </div>
</template>

<script>
  export default {
    name: "SocialLinks",
    methods: {
      discordClick() {
        gtag("event", "Discord", {event_category: "Social"});
      },
      twitterClick() {
        gtag("event", "Twitter", {event_category: "Social"});
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
    }
  }
</script>

<style lang="scss" scoped>
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