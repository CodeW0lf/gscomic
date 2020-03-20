<template>
  <section class="sketches-section">
    <div id="sketches-top" class="level sketches-level">
      <div class="level-left">
        <div class="level-item"></div>
      </div>
      <SiteNav></SiteNav>
    </div>
    <transition-group name="fade">
      <div v-for="item in sketchList" :key="item.src">
          <sketch :src="'/sketch_files/' + item.src" :date="item.date"></sketch>
      </div>
    </transition-group>
    <infinite-loading @infinite="loadHandler" :identifier="allSketches.length" spinner="spiral"></infinite-loading>
    <SocialLinks></SocialLinks>
  </section>
</template>

<script>
  import SiteNav from "@/components/SiteNav";
  import SocialLinks from "@/components/SocialLinks";
  import Sketch from "@/components/Sketch";
  import InfiniteLoading from "vue-infinite-loading";

  const sketchesToAdd = 2;
  export default {
    name: "Sketches",
    data() {
      return {
        sketchList: [],
        allSketches: []
      }
    },
    methods: {
      loadHandler($state) {
        if (this.sketchList.length < this.allSketches.length) {
          let idx = this.sketchList.length;
          this.sketchList.push(...this.allSketches.slice(idx, idx + sketchesToAdd));
          let p = new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
              resolve();
            };
            img.onerror = reject;
            img.src = '/sketch_files/' + this.sketchList[this.sketchList.length - 1].src;
          });
          p.then(() => {
            $state.loaded();
          });
        } else {
          $state.complete();
        }
      }
    },
    components: {
      InfiniteLoading,
      SocialLinks,
      SiteNav,
      Sketch
    },
    mounted() {
      this.$axios.get("get-sketches.php").then(res => {
        this.allSketches = res.data;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .sketches-section {
    margin: 20px auto;
    max-width: 900px;
  }
  .level {
    margin: 1.5rem;
  }
  .fade-enter-active {
    transition: opacity 0.5s;
  }
  .fade-enter {
    opacity: 0;
  }
</style>