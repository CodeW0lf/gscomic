<template>
  <section>
    <transition-group enter-active-class="animated fadeIn">
      <div v-for="item in sketchList" :key="item.src">
        <sketch :src="'/sketch_files/' + item.src" :date="item.date"></sketch>
      </div>
    </transition-group>
    <infinite-loading @infinite="loadHandler" :identifier="allSketches.length" spinner="spiral"></infinite-loading>
  </section>
</template>

<script>
  import Sketch from "@/components/Sketch";
  import InfiniteLoading from "vue-infinite-loading";
  import ComicsService from "@/services/ComicsService";

  const sketchesToAdd = 1;
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
        if (this.addSketches()) {
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
      },
      addSketches() {
        if (this.sketchList.length < this.allSketches.length) {
          let idx = this.sketchList.length;
          this.sketchList.push(...this.allSketches.slice(idx, idx + sketchesToAdd));
          return true;
        }
        return false;
      }
    },
    components: {
      InfiniteLoading,
      Sketch
    },
    mounted() {
      ComicsService.getSketches().then(res => {
        this.allSketches = res.data;
        this.addSketches();
      });
    }
  }
</script>

<style scoped>
</style>